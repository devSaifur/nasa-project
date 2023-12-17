"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortLaunchById = exports.existLaunchWithId = exports.addNewLaunch = exports.getAllLaunches = void 0;
const launches_mongo_1 = require("./launches.mongo");
const launches = new Map();
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('November 29, 2030'),
    destination: 'Kepler-442 b',
    customers: ['SpaceX', 'NASA'],
    upcoming: true,
    success: true,
};
let latestFlightNumber = 100;
saveLaunch();
async function saveLaunch() {
    try {
        await launches_mongo_1.launches.updateOne({ flightNumber: launch.flightNumber }, launch, {
            upsert: true,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}
async function getAllLaunches() {
    try {
        const allLaunches = await launches_mongo_1.launches.find({}, { _id: 0, __v: 0 });
        const sortedLaunches = allLaunches.sort((a, b) => {
            return a.flightNumber - b.flightNumber;
        });
        return sortedLaunches;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        console.log('Something went wrong getting launches!');
    }
}
exports.getAllLaunches = getAllLaunches;
function addNewLaunch(newLaunch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(Object.assign({}, newLaunch), { customers: ['SpaceX', 'NASA'], flightNumber: latestFlightNumber, success: true, upcoming: true }));
    return newLaunch;
}
exports.addNewLaunch = addNewLaunch;
function existLaunchWithId(launchId) {
    return launches.has(launchId);
}
exports.existLaunchWithId = existLaunchWithId;
function abortLaunchById(launchId) {
    const abortedLaunch = launches.get(launchId);
    if (abortedLaunch) {
        abortedLaunch.success = false;
        abortedLaunch.upcoming = false;
    }
    return abortedLaunch;
}
exports.abortLaunchById = abortLaunchById;
