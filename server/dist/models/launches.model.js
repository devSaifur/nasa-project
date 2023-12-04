"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortLaunchById = exports.existLaunchWithId = exports.addNewLaunch = exports.getAllLaunches = void 0;
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
launches.set(launch.flightNumber, launch);
function getAllLaunches() {
    const allLaunches = Array.from(launches.values());
    const sortedLaunches = allLaunches.sort((a, b) => {
        return a.flightNumber - b.flightNumber;
    });
    return sortedLaunches;
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
