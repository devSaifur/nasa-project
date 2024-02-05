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
        define(["require", "exports", "node:fs", "csv-parse", "./planets.mongo"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadPlanetsData = exports.getAllPlanets = void 0;
    const node_fs_1 = require("node:fs");
    const csv_parse_1 = require("csv-parse");
    const planets_mongo_1 = require("./planets.mongo");
    function getAllPlanets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield planets_mongo_1.planets
                    .find({}, {
                    _id: 0,
                    __v: 0,
                })
                    .exec();
                return res;
            }
            catch (err) {
                if (err instanceof Error)
                    console.error(err.stack);
                console.log(err);
            }
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
                .on('data', (data) => __awaiter(this, void 0, void 0, function* () {
                if (isHabitablePlanet(data))
                    savePlanets(data);
            }))
                .on('error', (err) => {
                console.error(err);
                reject(err);
            })
                .on('end', () => __awaiter(this, void 0, void 0, function* () {
                const planetsLength = yield getAllPlanets().then((data) => data === null || data === void 0 ? void 0 : data.length);
                console.log(`${planetsLength} habitable planets have been found`);
                resolve();
            }));
        });
    }
    exports.loadPlanetsData = loadPlanetsData;
    function isHabitablePlanet(planet) {
        return (planet['koi_disposition'] === 'CONFIRMED' &&
            planet['koi_insol'] > 0.36 &&
            planet['koi_insol'] < 1.11 &&
            planet['koi_prad'] < 1.6);
    }
    function savePlanets(planet) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield planets_mongo_1.planets.updateOne({
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
        });
    }
});
