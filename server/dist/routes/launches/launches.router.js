"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchesRouter = void 0;
const express_1 = __importDefault(require("express"));
const launches_model_1 = require("../../models/launches.model");
const launchesRouter = express_1.default.Router();
exports.launchesRouter = launchesRouter;
launchesRouter.get('/launches', (req, res) => {
    return res.status(200).json((0, launches_model_1.getAllLaunches)());
});
