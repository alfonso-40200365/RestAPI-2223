import express from 'express' 
import { getUser, createUser } from '../controllers/authController' 

const router = express.Router() 

router.post('/login', getUser) 
router.post('/users', createUser) 

export default router 
