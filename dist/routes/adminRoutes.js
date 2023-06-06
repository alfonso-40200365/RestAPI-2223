"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
router.get('/owners', adminController_1.functionTODO);
router.get('/owners/:id', adminController_1.functionTODO);
router.patch('/owners/:id', adminController_1.functionTODO);
exports.default = router;
