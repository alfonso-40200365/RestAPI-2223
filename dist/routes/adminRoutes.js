"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
router.get('/owners', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, adminController_1.getOwners)(req, res));
router.get('/owners/:id', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, adminController_1.getOwnerById)(req, res));
router.patch('/owners/:id', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, adminController_1.updateOwnerById)(req, res));
exports.default = router;
