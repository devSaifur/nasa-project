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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "axios", "./launches.mongo", "./planets.mongo"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.existLaunchWithId = exports.abortLaunchById = exports.scheduleNewLaunch = exports.getAllLaunches = exports.loadLaunchesData = void 0;
    const axios_1 = __importStar(require("axios"));
    const launches_mongo_1 = require("./launches.mongo");
    const planets_mongo_1 = require("./planets.mongo");
    const DEFAULT_FLIGHT_NUMBER = 100;
    const SPACEX_API_URL = 'https://api.spacexdata.com/v5/launches/query';
    function loadLaunchesData() {
        return __awaiter(this, void 0, void 0, function* () {
            const firstLaunch = yield findLaunch({
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
                yield populateLaunchesDB();
            }
        });
    }
    exports.loadLaunchesData = loadLaunchesData;
    function getAllLaunches(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allLaunches = (yield launches_mongo_1.launches
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
        });
    }
    exports.getAllLaunches = getAllLaunches;
    function scheduleNewLaunch(newLaunch) {
        return __awaiter(this, void 0, void 0, function* () {
            const planet = yield planets_mongo_1.planets.findOne({
                kepler_name: newLaunch.destination,
            });
            if (!planet)
                throw new Error('No matching planet found!');
            const latestFlightNumber = yield getLatestFlightNumber();
            if (!latestFlightNumber)
                return;
            const newFlightNumber = latestFlightNumber + 1;
            const scheduledLaunch = Object.assign(Object.assign({}, newLaunch), { success: true, upcoming: true, customers: ['SpaceX', 'NASA'], flightNumber: newFlightNumber });
            yield saveLaunch(scheduledLaunch);
            return scheduledLaunch;
        });
    }
    exports.scheduleNewLaunch = scheduleNewLaunch;
    function abortLaunchById(launchId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield launches_mongo_1.launches.updateOne({
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
        });
    }
    exports.abortLaunchById = abortLaunchById;
    function existLaunchWithId(launchId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield findLaunch({ flightNumber: launchId });
        });
    }
    exports.existLaunchWithId = existLaunchWithId;
    function populateLaunchesDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(SPACEX_API_URL, {
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
        });
    }
    function saveLaunch(newLaunch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield launches_mongo_1.launches.findOneAndUpdate({ flightNumber: newLaunch.flightNumber }, newLaunch, {
                    upsert: true,
                });
            }
            catch (error) {
                if (error instanceof Error)
                    console.error(error.message);
                console.log('Something went wrong saving launch!');
            }
        });
    }
    function findLaunch(filer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield launches_mongo_1.launches.findOne(filer);
        });
    }
    function getLatestFlightNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            const latestLaunch = yield launches_mongo_1.launches.findOne().sort('-flightNumber');
            if (!latestLaunch)
                return DEFAULT_FLIGHT_NUMBER;
            const latestFlightNumber = latestLaunch.flightNumber;
            return latestFlightNumber;
        });
    }
});
