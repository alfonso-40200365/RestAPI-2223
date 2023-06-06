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
router.post('/myEvents', createMyEvent);
router.get('/myEvents', getMyEvents);
router.get('/myEvents/:id', getMyEventById);
router.patch('/myEvents/:id', updateMyEventById);
router.delete('/myEvents/:id', deleteMyEventById);
exports.default = router;
