import { connection } from '../database/provider'
import { Response } from 'express' 
import { AuthenticatedRequest } from '../models/Model'

import UserModel, { IUser } from '../models/userModel'

export const getOwnerById = async (req: AuthenticatedRequest, res: Response) => {
    console.log("Get Owner by ID")

    const authType = req.userType

    const { id } = req.params

    let user: IUser | null

    try {
        if (authType !== "admin" ) {
            return res.status(403).json({ message: 'Your not allowed to perform this request' })
        }

        user = await UserModel(connection).findById(id).exec()

        if (!user) {
            return res.status(404).json({ message: `No Owners found for ID: ${id}` })
        }

        return res.status(200).json({ message: 'Owners retrieved successfully', owner: user })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }

}

export const getOwners = async (req: AuthenticatedRequest, res: Response) => {
    console.log("Get Owners")

    const authType = req.userType

    let users: IUser[] = []

    try {
        if (authType !== "admin") {
            return res.status(403).json({ message: 'You are not allowed to perform this request' })
        }

        users = await UserModel(connection).find({ type: "owner" }).exec()

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No Owners found' })
        }

        return res.status(200).json({ message: 'Owners retrieved successfully', owners: users })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const updateOwnerById = async (req: AuthenticatedRequest, res: Response) => {
    console.log("Update Owner by ID")
}