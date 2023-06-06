import mongoose from "mongoose"

interface Rating {
    userId: string
    rating: number
}

interface Comment {
    userId: string
    comment: string
}

interface Like {
    userId: string
    like: boolean
}

export interface IReview extends mongoose.Document {
    id: string
    ratings: Rating[]
    comments: Comment[]
    likes: Like[]
    transform: () => IReview
}

const ratingSchema: mongoose.SchemaDefinition = {
    userId: { type: mongoose.SchemaTypes.String, required: true },
    rating: { type: mongoose.SchemaTypes.Number, required: true },
}

const commentSchema: mongoose.SchemaDefinition = {
    userId: { type: mongoose.SchemaTypes.String, required: true },
    comment: { type: mongoose.SchemaTypes.String, required: true },
}

const likeSchema: mongoose.SchemaDefinition = {
    userId: { type: mongoose.SchemaTypes.String, required: true },
    like: { type: mongoose.SchemaTypes.Boolean, required: true },
}

const schema: mongoose.SchemaDefinition = {
    ratings: { type: [ratingSchema], required: true },
    comments: { type: [commentSchema], required: true },
    likes: { type: [likeSchema], required: true },
}

const collectionName: string = "review"
const reviewSchema: mongoose.Schema = new mongoose.Schema(schema)

reviewSchema.methods.transform = function () {
    const obj = this.toObject()

    const id = obj._id
    delete obj._id
    obj.id = id

    return obj
}

const ReviewModel = (connection: mongoose.Connection): mongoose.Model<IReview> =>
    connection.model<IReview>(collectionName, reviewSchema)

export default ReviewModel
