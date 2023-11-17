"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlanetsData = exports.habitablePlanet = void 0;
const fs_1 = require("fs");
const csv_parse_1 = require("csv-parse");
let habitablePlanet = [];
exports.habitablePlanet = habitablePlanet;
function isHabitablePlanet(planet) {
    return (planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6);
}
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        (0, fs_1.createReadStream)('./data/kepler_data.csv')
            .pipe((0, csv_parse_1.parse)({
            comment: '#',
            columns: true,
        }))
            .on('data', (data) => {
            if (isHabitablePlanet(data))
                habitablePlanet.push(data);
        })
            .on('error', (err) => {
            console.log(err);
            reject(err);
        })
            .on('end', () => {
            console.log(`${habitablePlanet.length} habitable planets have been found`);
            resolve();
        });
    });
}
exports.loadPlanetsData = loadPlanetsData;
