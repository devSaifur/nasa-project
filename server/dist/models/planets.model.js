"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.habitablePlanet = void 0;
var fs_1 = require("fs");
var csv_parse_1 = require("csv-parse");
var habitablePlanet = [];
exports.habitablePlanet = habitablePlanet;
function isHabitablePlanet(planet) {
    return (planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6);
}
(0, fs_1.createReadStream)('./data/kepler_data.csv')
    .pipe((0, csv_parse_1.parse)({
    comment: '#',
    columns: true,
}))
    .on('data', function (data) {
    if (isHabitablePlanet(data))
        habitablePlanet.push(data);
})
    .on('error', function (err) {
    console.log(err);
})
    .on('end', function () {
    console.log("".concat(habitablePlanet.length, " habitable planets have been found"));
});
