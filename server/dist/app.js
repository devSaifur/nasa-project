"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const planets_router_1 = require("./routes/planets.router");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.DOMAIN_NAME,
}));
app.use(express_1.default.json());
app.use(planets_router_1.planetsRouter);
exports.default = app;
