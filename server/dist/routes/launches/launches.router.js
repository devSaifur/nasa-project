var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "./launches.controller"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.launchesRouter = void 0;
    const express_1 = __importDefault(require("express"));
    const launches_controller_1 = require("./launches.controller");
    const launchesRouter = express_1.default.Router();
    exports.launchesRouter = launchesRouter;
    launchesRouter.get('/', launches_controller_1.httpGetAllLaunches);
    launchesRouter.post('/', launches_controller_1.httpAddNewLaunch);
    launchesRouter.delete('/:id', launches_controller_1.httpAbortLaunch);
});
