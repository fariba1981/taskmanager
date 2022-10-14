"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb://localhost:27017/taskmanager", () => {
    console.log("Database connected");
});
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/tasks", taskRoutes_1.default);
app.use("/auth", authRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.get('/', (req, res) => res.send('Welcome to Task Management System'));
app.listen(3000, () => console.log('listening on port 3000'));
