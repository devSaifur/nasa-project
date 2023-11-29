"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launches = void 0;
const launches = new Map();
exports.launches = launches;
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
launches.set(launch.flightNumber, launch);
