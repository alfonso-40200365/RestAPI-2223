import express from 'express'
import dotenv from 'dotenv'
import { getConnection } from './database/provider'

dotenv.config()

import authRoutes from './routes/authRoutes'
import roomRoutes from './routes/roomRoutes'
import eventRoutes from './routes/eventRoutes'
import adminRoutes from './routes/adminRoutes'

const port: number = +(process.env.PORT as string)
const host: string = process.env.HOST as string

(async () => {
    try {
        await getConnection()

        const app = express()

        app.use(express.json()) 

        app.use('/', authRoutes)
        app.use('/rooms', roomRoutes)
        app.use('/events', eventRoutes)
        app.use('/admin', adminRoutes)

        app.all('*', (req, res) => {
            res.status(404).json({ message: 'API Rest | Unknown Route' })
        })

        app.listen(port, host, () =>
            console.log(`App listening to http://${host}:${port}/`)
        )
    } catch (error) {
        console.error('Failed to establish MongoDB connection:', error)
        process.exit(1)
    }
})()