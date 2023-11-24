"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const planets_model_1 = require("./models/planets.model");
const PORT = process.env.PORT || 4000;
const server = (0, http_1.createServer)(app_1.default);
async function startServer() {
    try {
        await (0, planets_model_1.loadPlanetsData)();
    }
    catch (error) {
        console.log(error);
        console.log('Failed to load planets data');
    }
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
startServer();
