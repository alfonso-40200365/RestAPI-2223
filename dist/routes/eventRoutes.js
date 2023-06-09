"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
router.post('/myEvents', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.createMyEvent)(req, res)); // --Done
router.get('/myEvents', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.getMyEvents)(req, res)); // --Done
router.get('/myEvents/:id', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.getMyEventById)(req, res)); // --Done
router.patch('/myEvents/:id', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.updateMyEventById)(req, res)); // --Done
router.get('/', eventController_1.getEvents); // --Done
router.get('/:id', eventController_1.getEventById); // --Done
router.delete('/:id', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.deleteMyEventById)(req, res)); // --Done
router.patch('/:id/like', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.getEventByIdLike)(req, res)); // --Done
router.patch('/:id/review', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.getEventByIdReview)(req, res)); // --Done
router.patch('/:id/comment', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, eventController_1.getEventByIdComment)(req, res)); // --Done
exports.default = router;
