"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const roomController_1 = require("../controllers/roomController");
const router = express_1.default.Router();
router.post('/myRooms', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, roomController_1.createMyRoom)(req, res)); // --DONE
router.get('/myRooms', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, roomController_1.getMyRooms)(req, res)); // --DONE
router.get('/myRooms/:id', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, roomController_1.getMyRoomById)(req, res)); // --DONE
router.patch('/myRooms/:id', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, roomController_1.updateMyRoomById)(req, res)); // --DONE
router.get('/', roomController_1.getRooms); // --DONE
router.get('/:id', roomController_1.getRoomById); // --DONE
router.delete('/:id', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, roomController_1.deleteMyRoomById)(req, res)); // --DONE
router.patch('/:id/like', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, roomController_1.getRoomByIdLike)(req, res)); // --DONE
router.patch('/:id/review', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, roomController_1.getRoomByIdReview)(req, res)); // --DONE
router.patch('/:id/comment', (req, res, next) => (0, authController_1.verifyToken)(req, res, next), (req, res) => (0, roomController_1.getRoomByIdComment)(req, res)); // --DONE
//router.patch('/:id/reserve', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getRoomByIdReserve(req as AuthenticatedRequest, res)) 
exports.default = router;
