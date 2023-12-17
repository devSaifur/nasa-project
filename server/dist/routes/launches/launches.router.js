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
launchesRouter.get('/', async (req, res) => {
    return res.status(200).json(await (0, launches_model_1.getAllLaunches)());
});
launchesRouter.post('/', (req, res) => {
    const newLaunch = req.body;
    if (!newLaunch.mission ||
        !newLaunch.rocket ||
        !newLaunch.launchDate ||
        !newLaunch.destination) {
        return res.status(400).json({ error: 'Missing required launch property' });
    }
    newLaunch.launchDate = new Date(newLaunch.launchDate);
    if (isNaN(newLaunch.launchDate)) {
        return res.status(400).json({ error: 'Invalid launch date' });
    }
    return res.status(201).json((0, launches_model_1.addNewLaunch)(newLaunch));
});
launchesRouter.delete('/:id', (req, res) => {
    const launchId = req.params.id;
    const launchExist = (0, launches_model_1.existLaunchWithId)(Number(launchId));
    if (!launchExist) {
        res.status(400).json({ error: 'Launch does not exist' });
    }
    const abortedLaunch = (0, launches_model_1.abortLaunchById)(Number(launchId));
    return res.status(200).json(abortedLaunch);
});
