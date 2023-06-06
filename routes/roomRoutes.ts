import express from 'express' 
import { getRooms, getRoomById, functionTODO } from '../controllers/roomController' 

const router = express.Router() 

router.get('/', getRooms) 
router.get('/:id', getRoomById) 
router.get('/:id/like', functionTODO) 
router.get('/:id/comment', functionTODO) 
router.get('/:id/reserve', functionTODO) 

router.post('/myRooms', functionTODO)

router.get('/myRooms', functionTODO)
router.get('/myRooms/:id', functionTODO)

router.patch('/myRooms/:id', functionTODO)

export default router 
