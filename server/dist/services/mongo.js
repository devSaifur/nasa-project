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
        define(["require", "exports", "mongoose", "dotenv/config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mongoDisconnect = exports.mongoConnect = exports.connectDB = void 0;
    const mongoose_1 = __importDefault(require("mongoose"));
    require("dotenv/config");
    const MONGO_URI = process.env.MONGO_URI;
    function connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(MONGO_URI);
        });
    }
    exports.connectDB = connectDB;
    mongoose_1.default.connection.once('open', () => {
        console.log("You've successfully connected to MongoDB");
    });
    mongoose_1.default.connection.on('error', (error) => {
        if (error instanceof Error)
            console.error(error.message);
        console.log('Something went wrong when connecting to DB!');
    });
    function mongoConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(MONGO_URI);
        });
    }
    exports.mongoConnect = mongoConnect;
    function mongoDisconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.disconnect();
        });
    }
    exports.mongoDisconnect = mongoDisconnect;
});
