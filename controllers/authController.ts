import { Request, Response } from 'express'
import { connection } from '../database/provider'
import bcrypt from 'bcryptjs' 


import UserModel, { IUser } from '../models/userModel'

export const getUser = async (req: Request, res: Response) => {
    console.log("Get User")

    const { username, password } = req.body
    let user: IUser | null

    try {
        if (username === undefined || password === undefined) {
            return res.status(400).json({ message: 'Please provide username and password' })
        }

        user = await UserModel(connection)
            .findOne({ username })
            .exec()

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' })
        }
        
        const auth = {
            userId: user.id,
            userType: user.type
        }

        return res.status(200).json({ message: 'Login successful', auth })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }

}

export const createUser = async (req: Request, res: Response) => {
    console.log("Create User")

    const { username, password, email, type } = req.body
    let user: IUser | null

    try {
        if (username === undefined || password === undefined || email === undefined || type === undefined) {
            return res.status(400).json({ message: 'Please provide username, password, email and type' })
        }

        user = await UserModel(connection)
            .findOne({ $or: [{ username }, { email }] })
            .exec()

        if (user) {
            return res.status(409).json({ message: 'Username or E-mail already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10) 
        console.log(hashedPassword)

        user = await UserModel(connection)
            .create({ username, password: hashedPassword, email, verified: false, type })

        if (!user) {
            return res.status(500).json({ message: 'Failed to create user' })
        }

        const auth = {
            userId: user.id,
            userType: user.type
        }

        return res.status(201).json({ message: 'User created successful', auth })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

