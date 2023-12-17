"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launches = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const launchesSchema = new Schema({
    flightNumber: Number,
    launchDate: Date,
    mission: String,
    rocket: String,
    destination: String,
    customers: [String],
    upcoming: Boolean,
    success: { type: Boolean, default: true },
});
const launches = mongoose_1.default.model('Launch', launchesSchema);
exports.launches = launches;
