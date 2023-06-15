import { connection } from '../database/provider'
import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../models/Model'

import ReviewModel, { IReview } from '../models/reviewModel'
import EventModel, { IEvent } from '../models/eventModel'

export const getEvents = async (req: Request, res: Response) => {
    console.log("Get Events")

    let events: IEvent[] = []

    try {
        const { date, type } = req.query
        const filters: any = {}

        if (typeof date === 'string') {
            filters.date = { $gte: new Date(date) }
        }

        if (type) {
            filters.type = type
        }

        events = await EventModel(connection).find(filters)

        if (!events || events.length === 0) {
            return res.status(404).json({ message: 'No events found' })
        }

        return res.status(200).json({ message: 'Events retrieved successfully', events })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const getEventById = async (req: Request, res: Response) => {
    console.log('Get Event by ID')

    const { id } = req.params

    let event: IEvent | null
    let review: IReview | null

    try {
        event = await EventModel(connection).findById(id).exec()
        review = await ReviewModel(connection).findOne({ eventId: id })

        if (!event) {
            return res.status(404).json({ message: `No event found for ID: ${id}` })
        }

        review = review ? review.transform() : null

        return res.status(200).json({ message: 'Event retrieved successfully', event: event, review: review })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const getEventByIdLike = async (req: AuthenticatedRequest, res: Response) => {
    console.log('Get Event by ID and Like')

    const authId = req.userId

    const { id } = req.params

    let event: IEvent | null
    let review: IReview | null

    try {
        event = await EventModel(connection).findById(id).exec()

        if (!event) {
            return res.status(404).json({ message: `No event found for ID: ${id}` })
        }

        if (event.reviewId) {
            review = await ReviewModel(connection).findById(event.reviewId).exec()

            if (!review) {
                return res.status(404).json({ message: 'Review not found' })
            }

            const userLikeIndex = review.likes.findIndex((like) => like.userId === authId)

            if (userLikeIndex !== -1) {
                const userLike = review.likes[userLikeIndex]
                if (userLike.like === true) {
                    userLike.like = false

                    await review.save()
                    return res.status(200).json({ message: 'Review like updated to false', review: review.id })
                } else {
                    userLike.like = true

                    await review.save()
                    return res.status(200).json({ message: 'Review liked successfully', review: review.id })
                }
            }

            review.likes.push({ userId: authId, like: true })
            await review.save()

            return res.status(200).json({ message: 'Review liked successfully', review: review.id })
        }

        const reviewArgs = {
            ratings: [],
            comments: [],
            likes: [{ userId: authId, like: true }]
        }

        review = await ReviewModel(connection)
            .create(reviewArgs)

        review.transform()

        event.reviewId = review.id
        await event.save()

        return res.status(200).json({ message: 'Review created and liked successfully', review: review.id })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const getEventByIdComment = async (req: AuthenticatedRequest, res: Response) => {
    console.log('Get Event by ID and Comment')

    const authId = req.userId

    const { id } = req.params
    const { comment } = req.body

    let event: IEvent | null
    let review: IReview | null

    try {
        event = await EventModel(connection).findById(id).exec()

        if (!event) {
            return res.status(404).json({ message: `No event found for ID: ${id}` })
        }

        if (event.reviewId) {
            review = await ReviewModel(connection).findById(event.reviewId).exec()

            if (!review) {
                return res.status(404).json({ message: 'Review not found' })
            }

            if (!comment) {
                return res.status(400).json({ message: 'Please provide comment' })
            }

            review.comments.push({
                userId: authId,
                comment,
                timeStamp: new Date()
            })

            await review.save()

            return res.status(200).json({ message: 'Comment added successfully', review: review.id })
        }

        const reviewArgs = {
            ratings: [],
            comments: [{ userId: authId, comment, timeStamp: new Date() }],
            likes: []
        }

        review = await ReviewModel(connection).create(reviewArgs)

        review.transform()

        event.reviewId = review.id
        await event.save()

        return res.status(200).json({ message: 'Review created and comment added successfully', review: review.id })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const createMyEvent = async (req: AuthenticatedRequest, res: Response) => {
    console.log("Create My Event")

    const { ownerId, reviewId, title, description, location, type } = req.body
    const authId = req.userId
    const authType = req.userType

    let { date } = req.body

    let event: IEvent | null

    // Se nao inserir uma data usar a data atual
    // Development
    if (!date) {
        date = Date.now()
    }

    try {
        if (!ownerId || !title || !description || !location || !type) {
            return res.status(400).json({ message: 'Please provide ownerId, title, description, location and type' })
        }

        if (authType !== "admin" && ownerId !== authId) {
            return res.status(403).json({ message: "You are not authorized to perform this request" })
        }

        event = await EventModel(connection)
            .findOne({ title })

        if (event) {
            return res.status(409).json({ message: 'Event Title already exists' })
        }

        event = await EventModel(connection)
            .create({ ownerId, reviewId, title, description, location, date, type })

        if (!event) {
            return res.status(500).json({ message: 'Failed to create event' })
        }

        return res.status(201).json({ message: 'Event created successful', eventId: event.id })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }

}

export const getMyEvents = async (req: AuthenticatedRequest, res: Response) => {
    console.log("Get My Events")

    const authId = req.userId
    const authType = req.userType

    try {
        if (authType == "student") {
            return res.status(403).json({ message: 'Your not allowed to perform this request' })
        }

        const events = await EventModel(connection)
            .find({ ownerId: authId })

        if (!events || events.length === 0) {
            return res.status(404).json({ message: `No events found for owner: ${authId}` })
        }

        return res.status(200).json({ message: `Events of owner: ${authId}`, events })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const getMyEventById = async (req: AuthenticatedRequest, res: Response) => {
    console.log("Get My Event by ID")

    const authId = req.userId
    const authType = req.userType

    const { id } = req.params

    let event: IEvent | null
    let review: IReview | null

    try {
        if (authType == "student" || (authId !== id && authType !== "admin")) {
            return res.status(403).json({ message: 'Your not allowed to perform this request' })
        }

        event = await EventModel(connection).findById(id).exec()
        review = await ReviewModel(connection).findOne({ eventId: id })

        if (!event) {
            return res.status(404).json({ message: `No event found for ID: ${id}` })
        }

        return res.status(200).json({ message: 'Event retrieved successfully', event: event, review: review })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }

}

export const updateMyEventById = async (req: AuthenticatedRequest, res: Response) => {
    console.log('Update My Event by ID')

    const { id } = req.params
    const { ownerId, reviewId, ...updatedFields } = req.body

    const authId = req.userId
    const authType = req.userType

    
    try {
        if (authType == "student" || (authId !== id && authType !== "admin")) {
            return res.status(403).json({ message: 'Your not allowed to perform this request' })
        }

        const event = await EventModel(connection).findByIdAndUpdate(id, updatedFields, { new: true }).exec()

        if (!event) {
            return res.status(404).json({ message: `No event found for ID: ${id}` })
        }

        return res.status(200).json({ message: 'Event updated successfully', event: event })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}


export const deleteMyEventById = async (req: AuthenticatedRequest, res: Response) => {
    console.log("Delete My Event by ID")

    const authId = req.userId
    const authType = req.userType

    const { id } = req.params

    let event: IEvent | null

    try {
        if (authType == "student" || (authId !== id && authType !== "admin")) {
            return res.status(403).json({ message: 'Your not allowed to perform this request' })
        }

        event = await EventModel(connection).findByIdAndDelete(id).exec()
        await ReviewModel(connection).findOneAndDelete({ eventId: id })

        if (!event) {
            return res.status(404).json({ message: `No event found for ID: ${id}` })
        }

        return res.status(200).json({ message: 'Event and Reviews deleted successfully' })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }

}