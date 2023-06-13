import express, { Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../models/Model'
import { getEvents, getEventById, getEventByIdLike, getEventByIdComment, createMyEvent, getMyEvents, getMyEventById, updateMyEventById, deleteMyEventById } from '../controllers/eventController' 
import { verifyToken } from '../controllers/authController'

const router = express.Router() 


router.post('/myEvents', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => createMyEvent(req as AuthenticatedRequest, res)) // --Done

router.get('/myEvents', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getMyEvents(req as AuthenticatedRequest, res)) // --Done
router.get('/myEvents/:id', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getMyEventById(req as AuthenticatedRequest, res)) // -Done

router.patch('/myEvents/:id',(req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => updateMyEventById(req as AuthenticatedRequest, res))

router.delete('/myEvents/:id', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => deleteMyEventById(req as AuthenticatedRequest, res))
//apagar event e review com eventId == id

router.get('/', getEvents) // --Done
router.get('/:id', getEventById) // --Done
router.patch('/:id/like', getEventByIdLike) 
router.patch('/:id/comment', getEventByIdComment) 

export default router 
