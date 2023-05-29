import express from 'express' 
import { getRooms, getRoomById, functionTODO } from '../controllers/roomController' 

const router = express.Router() 

router.get('/', getRooms) 
router.get('/:id', getRoomById) 
router.get('/:id/like', functionTODO) 
router.get('/:id/comment', functionTODO) 
router.get('/:id/reserve', functionTODO) 

export default router 
