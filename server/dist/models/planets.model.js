"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlanetsData = exports.getAllPlanets = void 0;
const node_fs_1 = require("node:fs");
const csv_parse_1 = require("csv-parse");
const planets_mongo_1 = require("./planets.mongo");
async function getAllPlanets() {
    return await planets_mongo_1.planets.find({}, {
        _id: 0,
        __v: 0,
    });
}
exports.getAllPlanets = getAllPlanets;
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        (0, node_fs_1.createReadStream)('./data/kepler_data.csv')
            .pipe((0, csv_parse_1.parse)({
            comment: '#',
            columns: true,
        }))
            .on('data', async (data) => {
            if (isHabitablePlanet(data))
                savePlanets(data);
        })
            .on('error', (err) => {
            console.error(err);
            reject(err);
        })
            .on('end', async () => {
            const planetsLength = (await getAllPlanets()).length;
            console.log(`${planetsLength} habitable planets have been found`);
            resolve();
        });
    });
}
exports.loadPlanetsData = loadPlanetsData;
function isHabitablePlanet(planet) {
    return (planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6);
}
async function savePlanets(planet) {
    try {
        await planets_mongo_1.planets.updateOne({
            kepler_name: planet.kepler_name,
        }, {
            kepler_name: planet.kepler_name,
        }, {
            upsert: true,
        });
    }
    catch (error) {
        if (error instanceof Error)
            console.error(error.message);
        console.log('Something went wrong when saving planets to db!');
    }
}
