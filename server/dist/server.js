"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const planets_model_1 = require("./models/planets.model");
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const server = (0, node_http_1.createServer)(app_1.default);
async function startServer() {
    try {
        (0, planets_model_1.loadPlanetsData)();
        await mongoose_1.default.connect(MONGO_URI);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        console.log('Something went wrong!');
    }
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
startServer();
mongoose_1.default.connection.once('open', () => {
    console.log("You've successfully connected to MongoDB");
});
mongoose_1.default.connection.on('error', (error) => {
    if (error instanceof Error)
        console.log(error.message);
    console.log('Something went wrong!');
});
