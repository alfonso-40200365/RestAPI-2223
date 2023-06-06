"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
router.get('/', eventController_1.getEvents);
router.get('/:id', eventController_1.getEventById);
router.get('/:id/like', eventController_1.functionTODO);
router.get('/:id/comment', eventController_1.functionTODO);
router.post('/myEvents', eventController_1.functionTODO);
router.get('/myEvents', eventController_1.functionTODO);
router.get('/myEvents/:id', eventController_1.functionTODO);
router.patch('/myEvents/:id', eventController_1.functionTODO);
exports.default = router;
