var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "./planets.controller"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.planetsRouter = void 0;
    const express_1 = __importDefault(require("express"));
    const planets_controller_1 = require("./planets.controller");
    const planetsRouter = express_1.default.Router();
    exports.planetsRouter = planetsRouter;
    planetsRouter.get('/', planets_controller_1.httpGetAllPlanets);
});
