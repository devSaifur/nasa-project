"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existLaunchWithId = exports.abortLaunchById = exports.scheduleNewLaunch = exports.getAllLaunches = void 0;
const launches_mongo_1 = require("./launches.mongo");
const planets_mongo_1 = require("./planets.mongo");
const DEFAULT_FLIGHT_NUMBER = 100;
async function getAllLaunches() {
    try {
        const allLaunches = await launches_mongo_1.launches.find({}, { _id: 0, __v: 0 });
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
    return await launches_mongo_1.launches.findOne({ flightNumber: launchId });
}
exports.existLaunchWithId = existLaunchWithId;
async function saveLaunch(newLaunch) {
    try {
        const planet = await planets_mongo_1.planets.findOne({ kepler_name: newLaunch.destination });
        if (!planet)
            throw new Error('No matching planet found!');
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
async function getLatestFlightNumber() {
    const latestLaunch = await launches_mongo_1.launches.findOne().sort('-flightNumber');
    if (!latestLaunch)
        return DEFAULT_FLIGHT_NUMBER;
    const latestFlightNumber = latestLaunch.flightNumber;
    return latestFlightNumber;
}
