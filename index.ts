import express from 'express' 
import dotenv from 'dotenv' 
dotenv.config() 

import authRoutes from './routes/authRoutes' 
import roomRoutes from './routes/roomRoutes' 
import eventRoutes from './routes/eventRoutes' 

const port: number = +(process.env.PORT as string) 
const host: string = process.env.HOST as string 

const app = express()

app.use('/auth', authRoutes)
app.use('/rooms', roomRoutes)
app.use('/events', eventRoutes) 

app.all('*', (req, res) => {
  res.status(404).json({ message: 'API Rest | Unknown Route' }) 
})

app.listen(port, host, () =>
  console.log(`App listening to http://${host}:${port}/`)
)