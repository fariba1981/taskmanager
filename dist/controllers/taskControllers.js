"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskByWorker = exports.getTaskByOwner = exports.getTask = exports.getTasks = exports.createTask = void 0;
const taskModel_1 = __importDefault(require("../models/taskModel"));
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log("Data", data);
        var task = yield taskModel_1.default.create(data);
        return res
            .status(200)
            .json({ message: "Task created successfully", data: task });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createTask = createTask;
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var tasks = yield taskModel_1.default.find({}, 'title owner');
        return res.status(200).json({ message: "All tasks!", data: tasks });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getTasks = getTasks;
const getTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var task = yield taskModel_1.default.findById(id);
        return res.status(200).json({ message: "Tasks found!", data: task });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getTask = getTask;
const getTaskByOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var task = yield taskModel_1.default.find({ owner: id }).populate("owner", ["title", "description"]).exec();
        return res.status(200).json({ message: "Tasks found!", data: task });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getTaskByOwner = getTaskByOwner;
const getTaskByWorker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var task = yield taskModel_1.default.find({ worker: id }).populate("worker", ["title", "description"]).exec();
        return res.status(200).json({ message: "Tasks found!", data: task });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getTaskByWorker = getTaskByWorker;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var task = yield taskModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
        return res
            .status(200)
            .json({ message: "Task updated successfully!", data: task });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var isDeleted = yield taskModel_1.default.findByIdAndDelete(id);
        if (!isDeleted)
            throw new Error("Failed to delete task");
        return res.status(200).json({ message: "Task deleted successfully!" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteTask = deleteTask;
