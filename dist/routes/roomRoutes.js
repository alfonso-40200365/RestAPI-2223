"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = require("../controllers/roomController");
const router = express_1.default.Router();
router.get('/', roomController_1.getRooms);
router.get('/:id', roomController_1.getRoomById);
router.get('/:id/like', roomController_1.functionTODO);
router.get('/:id/comment', roomController_1.functionTODO);
router.get('/:id/reserve', roomController_1.functionTODO);
router.post('/myRooms', roomController_1.functionTODO);
router.get('/myRooms', roomController_1.functionTODO);
router.get('/myRooms/:id', roomController_1.functionTODO);
router.patch('/myRooms/:id', roomController_1.functionTODO);
router.delete('/myRooms/:id', roomController_1.functionTODO);
exports.default = router;
