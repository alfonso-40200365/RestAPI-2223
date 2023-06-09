import express, { Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../models/Model'
import { getEvents, getEventById, functionTODO, createMyEvent, getMyEvents, getMyEventById, updateMyEventById, deleteMyEventById } from '../controllers/eventController' 
import { verifyToken } from '../controllers/authController'

const router = express.Router() 


router.post('/myEvents', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => createMyEvent(req as AuthenticatedRequest, res))

router.get('/myEvents', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getMyEvents(req as AuthenticatedRequest, res))
router.get('/myEvents/:id', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getMyEventById(req as AuthenticatedRequest, res))

router.patch('/myEvents/:id',(req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => updateMyEventById(req as AuthenticatedRequest, res))

router.delete('/myEvents/:id', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => deleteMyEventById(req as AuthenticatedRequest, res))

router.get('/', getEvents) 
router.get('/:id', getEventById) 
router.patch('/:id/like', functionTODO) 
router.patch('/:id/comment', functionTODO) 
//apagar event e review com eventId == id

export default router 
