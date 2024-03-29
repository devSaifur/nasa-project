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
        define(["require", "exports", "../../models/launches.model", "../../services/query"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.httpAbortLaunch = exports.httpAddNewLaunch = exports.httpGetAllLaunches = void 0;
    const launches_model_1 = require("../../models/launches.model");
    const query_1 = require("../../services/query");
    function httpGetAllLaunches(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, skip } = (0, query_1.getPagination)(req.query);
            const allLaunches = yield (0, launches_model_1.getAllLaunches)(skip, limit);
            return res.status(200).json(allLaunches);
        });
    }
    exports.httpGetAllLaunches = httpGetAllLaunches;
    function httpAddNewLaunch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return res.status(201).json(yield (0, launches_model_1.scheduleNewLaunch)(newLaunch));
        });
    }
    exports.httpAddNewLaunch = httpAddNewLaunch;
    function httpAbortLaunch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const launchId = req.params.id;
            const launchExist = (0, launches_model_1.existLaunchWithId)(Number(launchId));
            if (!launchExist) {
                res.status(400).json({ error: 'Launch does not exist' });
            }
            try {
                const abortRes = yield (0, launches_model_1.abortLaunchById)(Number(launchId));
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
    }
    exports.httpAbortLaunch = httpAbortLaunch;
});
