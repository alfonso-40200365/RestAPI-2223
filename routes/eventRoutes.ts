import express, { Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../models/Model'
import { verifyToken } from '../controllers/authController'

import { getEvents, getEventById, getEventByIdLike, getEventByIdReview, getEventByIdComment, createMyEvent, getMyEvents, getMyEventById, updateMyEventById, deleteMyEventById } from '../controllers/eventController' 

const router = express.Router() 


router.post('/myEvents', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => createMyEvent(req as AuthenticatedRequest, res)) // --Done

router.get('/myEvents', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getMyEvents(req as AuthenticatedRequest, res)) // --Done
router.get('/myEvents/:id', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getMyEventById(req as AuthenticatedRequest, res)) // --Done
router.patch('/myEvents/:id',(req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => updateMyEventById(req as AuthenticatedRequest, res)) // --Done

router.get('/', getEvents) // --Done
router.get('/:id', getEventById) // --Done
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => deleteMyEventById(req as AuthenticatedRequest, res)) // --Done
router.patch('/:id/like', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getEventByIdLike(req as AuthenticatedRequest, res)) // --Done
router.patch('/:id/review', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getEventByIdReview(req as AuthenticatedRequest, res)) // --Done
router.patch('/:id/comment', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getEventByIdComment(req as AuthenticatedRequest, res)) // --Done

export default router 
