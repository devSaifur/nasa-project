"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const api_1 = require("./routes/api");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.use('/v1', api_1.api);
const publicPath = node_path_1.default.join(__dirname, '..', 'public');
app.use(express_1.default.static(publicPath));
app.get('/*', (req, res) => {
    res.sendFile(node_path_1.default.join(publicPath, 'index.html'));
});
exports.default = app;
