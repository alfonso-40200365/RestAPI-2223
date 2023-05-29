import express from 'express' 
import { login, register } from '../controllers/authController' 

const router = express.Router() 

router.post('/login', login) 
router.post('/users', register) 

export default router 
