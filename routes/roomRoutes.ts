import express, { Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../models/Model'
import { verifyToken } from '../controllers/authController'

import { getRooms, getRoomById, getRoomByIdLike, getRoomByIdComment, getRoomByIdReview, createMyRoom, getMyRooms, getMyRoomById, updateMyRoomById, deleteMyRoomById } from '../controllers/roomController' 

const router = express.Router() 


router.post('/myRooms', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => createMyRoom(req as AuthenticatedRequest, res)) // --DONE

router.get('/myRooms', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getMyRooms(req as AuthenticatedRequest, res)) // --DONE
router.get('/myRooms/:id', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getMyRoomById(req as AuthenticatedRequest, res)) // --DONE
router.patch('/myRooms/:id',(req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => updateMyRoomById(req as AuthenticatedRequest, res)) // --DONE

router.get('/', getRooms) // --DONE
router.get('/:id', getRoomById) // --DONE
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => deleteMyRoomById(req as AuthenticatedRequest, res)) // --DONE
router.patch('/:id/like', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getRoomByIdLike(req as AuthenticatedRequest, res)) // --DONE
router.patch('/:id/review', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getRoomByIdReview(req as AuthenticatedRequest, res)) // --DONE
router.patch('/:id/comment', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getRoomByIdComment(req as AuthenticatedRequest, res)) // --DONE
//router.patch('/:id/reserve', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getRoomByIdReserve(req as AuthenticatedRequest, res)) 

export default router
