"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    worker: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["new", "assined", "done"],
        default: "new"
    },
});
exports.default = (0, mongoose_1.model)('Task', taskSchema);
