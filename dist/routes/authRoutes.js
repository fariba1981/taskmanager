"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userController_1 = require("../controllers/userController");
router.post('/signUp', userController_1.signUp);
router.post('/signIn', userController_1.signIn);
exports.default = router;
