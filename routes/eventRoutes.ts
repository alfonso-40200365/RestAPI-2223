import express, { Request, Response } from 'express'
import { AuthenticatedRequest } from '../models/Model'
import { getEvents, getEventById, functionTODO, createMyEvent, getMyEvents, getMyEventById, updateMyEventById, deleteMyEventById } from '../controllers/eventController' 

const router = express.Router() 

router.get('/', getEvents) 
router.patch('/:id', getEventById) 
router.patch('/:id/like', functionTODO) 
router.patch('/:id/comment', functionTODO) 

router.post('/myEvents', (req: Request, res: Response) => createMyEvent(req as AuthenticatedRequest, res));

router.get('/myEvents', getMyEvents)
router.get('/myEvents/:id', getMyEventById)

router.patch('/myEvents/:id', updateMyEventById)

router.delete('/myEvents/:id', deleteMyEventById)

export default router 
