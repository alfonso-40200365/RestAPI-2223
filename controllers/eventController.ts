import { Request, Response } from 'express' 
import { connection } from '../database/provider'

import EventModel, { IEvent } from '../models/eventModel'
import { AuthenticatedRequest } from '../models/Model'

export const getEvents = async (req: Request, res: Response) => {

}

export const getEventById = async (req: Request, res: Response) => {

}

export const functionTODO = async (req: Request, res: Response) =>  {

}

export const createMyEvent = async (req: AuthenticatedRequest, res: Response) =>  {
    console.log("Create My Event")

    const { ownerId, reviewId, title, description, location, type } = req.body
    const { authid, authtype } = req.headers
    let { date } = req.body

    let event: IEvent | null

    // Se nao inserir uma data usar a data atual
    // Development
    if (!date) {
        date = Date.now()
    }

    try {
        if (!ownerId || !title || !description || !location || !type || !authid || !authtype) {
            return res.status(400).json({ message: 'Please provide ownerId, title, description, location and type' })
        }

        if (authtype !== "admin" && ownerId !== authid) {
            return res.status(403).json({ message: "You are not authorized to perform this request" })
        }

        event = await EventModel(connection)
            .findOne({ title })

        if (event) {
            return res.status(409).json({ message: 'Event Title already exists'})
        }

        event = await EventModel(connection)
            .create({ ownerId, reviewId, title, description, location, date, type })

        if (!event) {
            return res.status(500).json({ message: 'Failed to create event' })
        }

        return res.status(201).json({ message: 'Event created successful', eventId: event.id})

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }

}

export const getMyEvents = async (req: Request, res: Response) =>  {

}

export const getMyEventById = async (req: Request, res: Response) =>  {

}

export const updateMyEventById = async (req: Request, res: Response) =>  {

}

export const deleteMyEventById = async (req: Request, res: Response) =>  {

}