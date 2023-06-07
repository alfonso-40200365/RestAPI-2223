import express from 'express' 
import { getRooms, getRoomById, functionTODO } from '../controllers/roomController' 

const router = express.Router() 

router.get('/', getRooms) 
router.get('/:id', getRoomById) 

router.patch('/:id/like', functionTODO) 
router.patch('/:id/comment', functionTODO) 
router.patch('/:id/reserve', functionTODO) 

router.post('/myRooms', functionTODO)

router.get('/myRooms', functionTODO)
router.get('/myRooms/:id', functionTODO)

router.patch('/myRooms/:id', functionTODO)

router.delete('/myRooms/:id', functionTODO)

export default router 
