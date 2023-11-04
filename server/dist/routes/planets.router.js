"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.planetsRouter = void 0;
var express_1 = __importDefault(require("express"));
var planets_model_1 = require("../models/planets.model");
var planetsRouter = express_1.default.Router();
exports.planetsRouter = planetsRouter;
planetsRouter.get('/planets', function (req, res) {
    return res.status(200).json(planets_model_1.habitablePlanet);
});
