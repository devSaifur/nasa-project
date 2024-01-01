var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node:http", "./app", "./services/mongo", "./models/planets.model", "./models/launches.model"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const node_http_1 = require("node:http");
    const app_1 = __importDefault(require("./app"));
    const mongo_1 = require("./services/mongo");
    const planets_model_1 = require("./models/planets.model");
    const launches_model_1 = require("./models/launches.model");
    const PORT = process.env.PORT || 4000;
    const server = (0, node_http_1.createServer)(app_1.default);
    function startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, mongo_1.connectDB)();
                (0, planets_model_1.loadPlanetsData)();
                (0, launches_model_1.loadLaunchesData)();
            }
            catch (error) {
                if (error instanceof Error)
                    console.log(error.message);
                console.log('Something went wrong starting server!');
            }
            finally {
                server.listen(PORT, () => {
                    console.log(`Server is running on port ${PORT}`);
                });
            }
        });
    }
    startServer();
});
