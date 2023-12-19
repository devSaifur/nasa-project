"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existLaunchWithId = exports.abortLaunchById = exports.scheduleNewLaunch = exports.getAllLaunches = exports.loadLaunchesData = void 0;
const axios_1 = __importStar(require("axios"));
const launches_mongo_1 = require("./launches.mongo");
const planets_mongo_1 = require("./planets.mongo");
const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v5/launches/query';
async function loadLaunchesData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });
    if (firstLaunch) {
        console.log('Launch data already loaded!');
        return;
    }
    else {
        console.log('Loading launch data...');
        await populateLaunchesDB();
    }
}
exports.loadLaunchesData = loadLaunchesData;
async function getAllLaunches(skip, limit) {
    try {
        const allLaunches = (await launches_mongo_1.launches
            .find({}, { _id: 0, __v: 0 })
            .sort({ flightNumber: 1 })
            .skip(skip)
            .limit(limit));
        const sortedLaunches = allLaunches.sort((a, b) => {
            return a.flightNumber - b.flightNumber;
        });
        return sortedLaunches;
    }
    catch (error) {
        if (error instanceof Error)
            console.error(error.message);
        console.log('Something went wrong getting launches!');
    }
}
exports.getAllLaunches = getAllLaunches;
async function scheduleNewLaunch(newLaunch) {
    const planet = await planets_mongo_1.planets.findOne({
        kepler_name: newLaunch.destination,
    });
    if (!planet)
        throw new Error('No matching planet found!');
    const latestFlightNumber = await getLatestFlightNumber();
    if (!latestFlightNumber)
        return;
    const newFlightNumber = latestFlightNumber + 1;
    const scheduledLaunch = Object.assign(Object.assign({}, newLaunch), { success: true, upcoming: true, customers: ['SpaceX', 'NASA'], flightNumber: newFlightNumber });
    await saveLaunch(scheduledLaunch);
    return scheduledLaunch;
}
exports.scheduleNewLaunch = scheduleNewLaunch;
async function abortLaunchById(launchId) {
    try {
        const res = await launches_mongo_1.launches.updateOne({
            flightNumber: launchId,
        }, {
            success: false,
            upcoming: false,
        });
        return res;
    }
    catch (error) {
        if (error instanceof Error)
            console.error(error.message);
        console.log('Something went wrong aborting launch!');
    }
}
exports.abortLaunchById = abortLaunchById;
async function existLaunchWithId(launchId) {
    return await findLaunch({ flightNumber: launchId });
}
exports.existLaunchWithId = existLaunchWithId;
async function populateLaunchesDB() {
    try {
        const response = await axios_1.default.post(SPACEX_API_URL, {
            query: {},
            options: {
                pagination: false,
                populate: [
                    {
                        path: 'rocket',
                        select: {
                            name: 1,
                        },
                    },
                    {
                        path: 'payloads',
                        select: {
                            customers: 1,
                        },
                    },
                ],
            },
        });
        const launchesDocs = response.data.docs;
        launchesDocs.forEach((launchDoc) => {
            const payloads = launchDoc['payloads'];
            const customers = payloads.flatMap((payload) => {
                return payload['customers'];
            });
            const launch = {
                flightNumber: launchDoc['flight_number'],
                mission: launchDoc['name'],
                rocket: launchDoc['rocket']['name'],
                launchDate: launchDoc['date_local'],
                upcoming: launchDoc['upcoming'],
                success: launchDoc['success'],
                customers,
            };
            saveLaunch(launch);
        });
        console.log(`${launchesDocs.length} launches have been loaded`);
    }
    catch (error) {
        if ((0, axios_1.isAxiosError)(error)) {
            console.error(error.message);
            console.log('Something went wrong when saving launches to DB!');
        }
    }
}
async function saveLaunch(newLaunch) {
    try {
        await launches_mongo_1.launches.findOneAndUpdate({ flightNumber: newLaunch.flightNumber }, newLaunch, {
            upsert: true,
        });
    }
    catch (error) {
        if (error instanceof Error)
            console.error(error.message);
        console.log('Something went wrong saving launch!');
    }
}
async function findLaunch(filer) {
    return await launches_mongo_1.launches.findOne(filer);
}
async function getLatestFlightNumber() {
    const latestLaunch = await launches_mongo_1.launches.findOne().sort('-flightNumber');
    if (!latestLaunch)
        return DEFAULT_FLIGHT_NUMBER;
    const latestFlightNumber = latestLaunch.flightNumber;
    return latestFlightNumber;
}
