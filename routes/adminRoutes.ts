import express, { Request, Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../models/Model'
import { verifyToken } from '../controllers/authController'

import { getOwners, getOwnerById, updateOwnerById } from '../controllers/adminController'

const router = express.Router()

router.get('/owners', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getOwners(req as AuthenticatedRequest, res))
router.get('/owners/:id', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => getOwnerById(req as AuthenticatedRequest, res))
router.patch('/owners/:id', (req: Request, res: Response, next: NextFunction) => verifyToken(req as AuthenticatedRequest, res, next), (req: Request, res: Response) => updateOwnerById(req as AuthenticatedRequest, res))

export default router