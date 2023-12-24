var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mongoose"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.planets = void 0;
    const mongoose_1 = __importDefault(require("mongoose"));
    const { Schema } = mongoose_1.default;
    const planetsSchema = new Schema({
        kepler_name: String,
    });
    const planets = mongoose_1.default.model('Planet', planetsSchema);
    exports.planets = planets;
});
