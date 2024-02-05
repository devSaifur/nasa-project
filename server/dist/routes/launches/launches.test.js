var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "supertest", "vitest", "../../services/mongo", "../../models/planets.model", "../../app"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const supertest_1 = __importDefault(require("supertest"));
    const vitest_1 = require("vitest");
    const mongo_1 = require("../../services/mongo");
    const planets_model_1 = require("../../models/planets.model");
    const app_1 = __importDefault(require("../../app"));
    (0, vitest_1.describe)('Launches API', () => {
        (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, mongo_1.mongoConnect)();
            yield (0, planets_model_1.loadPlanetsData)();
        }));
        (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, mongo_1.mongoDisconnect)();
        }));
        (0, vitest_1.describe)('Test GET /launches', () => {
            (0, vitest_1.test)('It should respond with 200 success', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, supertest_1.default)(app_1.default)
                    .get('/v1/launches')
                    .expect('Content-Type', /json/)
                    .expect(200);
            }));
        });
        (0, vitest_1.describe)('Test POST /launch', () => {
            const completeLaunchData = {
                mission: 'USS Enterprise',
                rocket: 'NCC 1701-D',
                destination: 'Kepler-62 f',
                launchDate: 'January 4, 2028',
            };
            const launchDataWithoutDate = {
                mission: 'USS Enterprise',
                rocket: 'NCC 1701-D',
                destination: 'Kepler-62 f',
            };
            const launchDataWithInvalidDate = {
                mission: 'USS Enterprise',
                rocket: 'NCC 1701-D',
                destination: 'Kepler-62 f',
                launchDate: 'zoot',
            };
            (0, vitest_1.test)('It should response with 201 created', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .post('/v1/launches')
                    .send(completeLaunchData)
                    .expect('Content-Type', /json/)
                    .expect(201);
                const requestDate = new Date(completeLaunchData.launchDate).valueOf();
                const responseDate = new Date(response.body.launchDate).valueOf();
                (0, vitest_1.expect)(responseDate).toBe(requestDate);
                (0, vitest_1.expect)(response.body).toMatchObject(launchDataWithoutDate);
            }));
            (0, vitest_1.test)('It should catch missing required properties', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .post('/v1/launches')
                    .send(launchDataWithoutDate)
                    .expect('Content-Type', /json/)
                    .expect(400);
                (0, vitest_1.expect)(response.body).toStrictEqual({
                    error: 'Missing required launch property',
                });
            }));
            (0, vitest_1.test)('It should catch invalid dates', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .post('/v1/launches')
                    .send(launchDataWithInvalidDate)
                    .expect('Content-Type', /json/)
                    .expect(400);
                (0, vitest_1.expect)(response.body).toStrictEqual({
                    error: 'Invalid launch date',
                });
            }));
        });
    });
});
