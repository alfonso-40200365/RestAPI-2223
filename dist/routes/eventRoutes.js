"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/myEvents', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.createMyEvent)(req, res));
router.get('/myEvents', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.getMyEvents)(req, res));
router.get('/myEvents/:id', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.getMyEventById)(req, res));
router.patch('/myEvents/:id', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.updateMyEventById)(req, res));
router.delete('/myEvents/:id', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.deleteMyEventById)(req, res));
//apagar event e review com eventId == id
router.get('/', eventController_1.getEvents);
router.get('/:id', eventController_1.getEventById);
router.patch('/:id/like', eventController_1.getEventByIdLike);
router.patch('/:id/comment', eventController_1.getEventByIdComment);
exports.default = router;
