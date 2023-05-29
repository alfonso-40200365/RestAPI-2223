import express from 'express' 
import { getEvents, getEventById, functionTODO } from '../controllers/eventController' 

const router = express.Router() 

router.get('/', getEvents) 
router.get('/:id', getEventById) 
router.get('/:id/like', functionTODO) 
router.get('/:id/comment', functionTODO) 

export default router 
