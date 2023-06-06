import express from 'express' 
import { getEvents, getEventById, functionTODO } from '../controllers/eventController' 

const router = express.Router() 

router.get('/', getEvents) 
router.get('/:id', getEventById) 
router.get('/:id/like', functionTODO) 
router.get('/:id/comment', functionTODO) 

router.post('/myEvents', createMyEvent)

router.get('/myEvents', getMyEvents)
router.get('/myEvents/:id', getMyEventById)

router.patch('/myEvents/:id', updateMyEventById)

router.delete('/myEvents/:id', deleteMyEventById)

export default router 
