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
launchesRouter.post('/', async (req, res) => {
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
    return res.status(201).json(await (0, launches_model_1.scheduleNewLaunch)(newLaunch));
});
launchesRouter.delete('/:id', async (req, res) => {
    const launchId = req.params.id;
    const launchExist = (0, launches_model_1.existLaunchWithId)(Number(launchId));
    if (!launchExist) {
        res.status(400).json({ error: 'Launch does not exist' });
    }
    try {
        const abortRes = await (0, launches_model_1.abortLaunchById)(Number(launchId));
        if (abortRes === null || abortRes === void 0 ? void 0 : abortRes.acknowledged) {
            return res.status(200).json({ ok: true });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ error: err.message });
        }
        console.log(err);
    }
});
