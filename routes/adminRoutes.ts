import express from 'express' 
import { functionTODO } from '../controllers/adminController' 

const router = express.Router()

router.get('/owners', functionTODO)
router.get('/owners/:id', functionTODO) 
router.patch('/owners/:id', functionTODO)

export default router