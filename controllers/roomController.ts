import { connection } from '../database/provider'
import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../models/Model'

import ReviewModel, { IReview } from '../models/reviewModel'
import RoomModel, { IRoom } from '../models/roomModel'
import ReservationModel, { IReservation } from '../models/reservationModel'

export const getRooms = async (req: Request, res: Response) => {
    console.log("Get Rooms")

    let rooms: IRoom[] = []

    try {
        const { date, type, title, price, numBeds, numPeople, location } = req.query
        const filters: any = {}

        if (typeof date === 'string') {
            filters.date = { $gte: new Date(date) }
        }

        if (type) {
            filters.type = type
        }

        if (title) {
            filters.title = { $regex: title, $options: 'i' }
        }

        if (price) {
            filters.price = { $lte: Number(price) }
        }

        if (numBeds) {
            filters.numBeds = { $gte: Number(numBeds) }
        }

        if (numPeople) {
            filters.numPeople = { $gte: Number(numPeople) }
        }

        if (location) {
            filters.location = { $regex: location, $options: 'i' }
        }

        rooms = await RoomModel(connection).find(filters)

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: 'No rooms found' })
        }

        return res.status(200).json({ message: 'Rooms retrieved successfully', rooms })
    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const getRoomById = async (req: Request, res: Response) => {
    console.log('Get Room by ID')

    const { id } = req.params

    let room: IRoom | null
    let review: IReview | null
    let reservation: IReservation | null = null

    try {
        room = await RoomModel(connection).findById(id).exec()
        review = await ReviewModel(connection).findOne({ roomId: id })
        if (room) {
            reservation = await ReservationModel(connection).findById(room.reservationId).exec()
        }

        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` })
        }

        review = review ? review.transform() : null
        reservation = reservation ? reservation.transform() : null

        return res.status(200).json({ message: 'Room retrieved successfully', room: room, review: review })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const getRoomByIdLike = async (req: AuthenticatedRequest, res: Response) => {
    console.log('Get Room by ID and Like')

    const authId = req.userId

    const { id } = req.params

    let room: IRoom | null
    let review: IReview | null

    try {
        room = await RoomModel(connection).findById(id).exec()

        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` })
        }

        if (room.reviewId) {
            review = await ReviewModel(connection).findById(room.reviewId).exec()

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

        room.reviewId = review.id
        await room.save()

        return res.status(200).json({ message: 'Review created and liked successfully', review: review.id })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const getRoomByIdComment = async (req: AuthenticatedRequest, res: Response) => {
    console.log('Get Room by ID and Comment')

    const authId = req.userId

    const { id } = req.params
    const { comment } = req.body

    let room: IRoom | null
    let review: IReview | null

    try {
        room = await RoomModel(connection).findById(id).exec()

        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` })
        }

        if (room.reviewId) {
            review = await ReviewModel(connection).findById(room.reviewId).exec()

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

        room.reviewId = review.id
        await room.save()

        return res.status(200).json({ message: 'Review created and comment added successfully', review: review.id })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const getRoomByIdReview = async (req: AuthenticatedRequest, res: Response) => {
    console.log('Get Room by ID and Review')
  
    const authId = req.userId
  
    const { id } = req.params
  
    let room: IRoom | null
    let review: IReview | null
  
    try {
      room = await RoomModel(connection).findById(id).exec()
  
      if (!room) {
        return res.status(404).json({ message: `No room found for ID: ${id}` })
      }
  
      // Check if the user has already reviewed the room
      review = await ReviewModel(connection).findOne({ 'ratings.userId': authId }).exec()
  
      if (review) {
        return res.status(409).json({ message: 'You have already reviewed this room' })
      }
  
      const { rating } = req.body
  
      if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Invalid rating. Please provide a number from 1 to 5' })
      }
  
      // Create a new review
      review = await ReviewModel(connection).create({
        ratings: [{ userId: authId, rating }],
        comments: [],
        likes: [],
      })
  
      review.transform()
  
      // Update the room with the new review ID
      room.reviewId = review.id
      await room.save()
  
      return res.status(200).json({ message: 'Review created successfully', review: review.id })
    } catch (error) {
      return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}
  
export const createMyRoom = async (req: AuthenticatedRequest, res: Response) => {
    console.log('Create My Room')

    const { title, description, location, availability, price, numBeds, numPeople, type } = req.body
    const authId = req.userId
    const authType = req.userType

    let room: IRoom | null

    try {
        if (!title || !description || !location || !availability || !price || !numBeds || !numPeople || !type) {
            return res.status(400).json({ message: 'Please provide all the required fields' })
        }

        if (authType == "student") {
            return res.status(403).json({ message: "You are not authorized to perform this request" })
        }

        room = await RoomModel(connection)
            .create({ authId, reviewId: "", reservationId: [], title, description, location, availability, price, numBeds, numPeople, type, })

        if (!room) {
            return res.status(500).json({ message: 'Failed to create room' })
        }

        return res.status(201).json({ message: 'Room created successfully', roomId: room.id })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...', error: error })
    }
}

export const getMyRooms = async (req: AuthenticatedRequest, res: Response) => {
    console.log("Get My Rooms")

    const authId = req.userId
    const authType = req.userType

    try {
        if (authType == "student") {
            return res.status(403).json({ message: 'Your not allowed to perform this request' })
        }

        const rooms = await RoomModel(connection)
            .find({ ownerId: authId })

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: `No rooms found for owner: ${authId}` })
        }

        return res.status(200).json({ message: `Rooms of owner: ${authId}`, rooms })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const getMyRoomById = async (req: AuthenticatedRequest, res: Response) => {
    console.log("Get My Room by ID")

    const authId = req.userId
    const authType = req.userType

    const { id } = req.params

    let room: IRoom | null
    let review: IReview | null

    try {
        if (authType == "student" || (authId !== id && authType !== "admin")) {
            return res.status(403).json({ message: 'Your not allowed to perform this request' })
        }

        room = await RoomModel(connection).findById(id).exec()
        review = await ReviewModel(connection).findOne({ roomId: id })

        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` })
        }

        return res.status(200).json({ message: 'Room retrieved successfully', room: room, review: review })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }

}

export const updateMyRoomById = async (req: AuthenticatedRequest, res: Response) => {
    console.log('Update My Room by ID')

    const { id } = req.params
    const { ownerId, reviewId, ...updatedFields } = req.body

    const authId = req.userId
    const authType = req.userType


    try {
        if (authType == "student" || (authId !== id && authType !== "admin")) {
            return res.status(403).json({ message: 'Your not allowed to perform this request' })
        }

        const room = await RoomModel(connection).findByIdAndUpdate(id, updatedFields, { new: true }).exec()

        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` })
        }

        return res.status(200).json({ message: 'Room updated successfully', room: room })

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
}

export const deleteMyRoomById = async (req: AuthenticatedRequest, res: Response) => {
    console.log("Delete My Room by ID")
  
    const authId = req.userId
    const authType = req.userType
  
    const { id } = req.params
  
    let room: IRoom | null
  
    try {
      if (authType === "student" || (authId !== id && authType !== "admin")) {
        return res.status(403).json({ message: 'You are not allowed to perform this request' })
      }
  
      room = await RoomModel(connection).findByIdAndDelete(id).exec()
      await ReviewModel(connection).findOneAndDelete({ roomId: id })
  
      if (!room) {
        return res.status(404).json({ message: `No room found for ID: ${id}` })
      }

      if (room.reservationId) {
        await ReservationModel(connection).findByIdAndDelete(room.reservationId).exec()
      }
  
      return res.status(200).json({ message: 'Room, Reviews, and Reservation deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Oops! Something went wrong...' })
    }
  }
  