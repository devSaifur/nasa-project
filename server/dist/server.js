"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const app_1 = __importDefault(require("./app"));
const mongo_1 = require("./services/mongo");
const planets_model_1 = require("./models/planets.model");
const launches_model_1 = require("./models/launches.model");
const PORT = process.env.PORT || 4000;
const server = (0, node_http_1.createServer)(app_1.default);
async function startServer() {
    try {
        await (0, mongo_1.connectDB)();
        (0, planets_model_1.loadPlanetsData)();
        (0, launches_model_1.loadLaunchesData)();
    }
    catch (error) {
        if (error instanceof Error)
            console.log(error.message);
        console.log('Something went wrong starting server!');
    }
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
startServer();
