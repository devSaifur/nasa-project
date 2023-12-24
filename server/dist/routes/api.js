var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "./launches/launches.router", "./planets/planets.router"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.api = void 0;
    const express_1 = __importDefault(require("express"));
    const launches_router_1 = require("./launches/launches.router");
    const planets_router_1 = require("./planets/planets.router");
    const api = express_1.default.Router();
    exports.api = api;
    api.use('/planets', planets_router_1.planetsRouter);
    api.use('/launches', launches_router_1.launchesRouter);
});
