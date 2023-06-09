"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
router.post('/myEvents', (req, res) => (0, eventController_1.createMyEvent)(req, res));
router.get('/myEvents', eventController_1.getMyEvents);
router.get('/myEvents/:id', eventController_1.getMyEventById);
router.patch('/myEvents/:id', eventController_1.updateMyEventById);
router.delete('/myEvents/:id', eventController_1.deleteMyEventById);
router.get('/', eventController_1.getEvents);
router.get('/:id', eventController_1.getEventById);
router.patch('/:id/like', eventController_1.functionTODO);
router.patch('/:id/comment', eventController_1.functionTODO);
//apagar event e review
exports.default = router;
