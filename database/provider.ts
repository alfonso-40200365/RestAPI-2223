import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const uri: string = process.env.DATABASE_URL as string

export let connection: mongoose.Connection

export const getConnection = async (): Promise<mongoose.Connection> => {
    if (mongoose.connection.readyState !== 1) {
        try {
            await mongoose.connect(uri, {
                bufferCommands: false,
                autoIndex: true,
                autoCreate: true,
            }) 
            console.log('Connection to DB was successful')
            connection = mongoose.connection
        } catch (error) {
            throw new Error('Connection to DB failed')
        }
    }
    return mongoose.connection
}

export const closeConnection = async (): Promise<mongoose.Connection> => {
    try {
        await mongoose.connection.close()
        console.log('Disconnection from DB was successful')
    } catch (error) {
        throw new Error('Disconnection from DB failed')
    }
    return mongoose.connection
}
