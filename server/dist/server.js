"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var app_1 = __importDefault(require("./app"));
var PORT = process.env.PORT || 4000;
var server = (0, http_1.createServer)(app_1.default);
server.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
