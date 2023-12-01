"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.planetsRouter = void 0;
const express_1 = __importDefault(require("express"));
const planets_model_1 = require("../../models/planets.model");
const planetsRouter = express_1.default.Router();
exports.planetsRouter = planetsRouter;
planetsRouter.get('/planets', (req, res) => {
    return res.status(200).json(planets_model_1.habitablePlanet);
});