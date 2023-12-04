"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const planets_router_1 = require("./routes/planets/planets.router");
const launches_router_1 = require("./routes/launches/launches.router");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.DOMAIN_NAME,
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/planets', planets_router_1.planetsRouter);
app.use('/launches', launches_router_1.launchesRouter);
exports.default = app;
