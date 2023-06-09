import express, { Request, Response } from 'express'
import { AuthenticatedRequest } from '../models/Model'
import { getEvents, getEventById, functionTODO, createMyEvent, getMyEvents, getMyEventById, updateMyEventById, deleteMyEventById } from '../controllers/eventController' 
import { verifyToken } from '../controllers/authController'

const router = express.Router() 



router.post('/myEvents', (req: Request, res: Response) => createMyEvent(req as AuthenticatedRequest, res));

router.get('/myEvents', verifyToken)
router.get('/myEvents/:id', verifyToken, getMyEventById)

router.patch('/myEvents/:id', verifyToken, updateMyEventById)

router.delete('/myEvents/:id', verifyToken, deleteMyEventById)

router.get('/', getEvents) 
router.get('/:id', getEventById) 
router.patch('/:id/like', functionTODO) 
router.patch('/:id/comment', functionTODO) 


//apagar event e review

export default router 
