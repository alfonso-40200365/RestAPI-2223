import mongoose from "mongoose"

enum TypeRoom {
    QuartoPrivado = "quarto privado",
    QuartoPartilhado = "quarto partilhado",
    Apartamento = "apartamento",
    Casa = "casa",
    Moradia = "moradia",
}

export interface IRoom extends mongoose.Document {
    id: string
    ownerId: string
    reviewId: string
    reservationId: string
    title: string
    description: string
    location: string
    availability: boolean
    price: number
    numBeds: number
    numPeople: number
    type: TypeRoom
    transform: () => IRoom
}

const schema: mongoose.SchemaDefinition = {
    ownerId: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    reviewId: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    reservationId: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    title: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    description: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    location: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    availability: { type: mongoose.SchemaTypes.Boolean, required: true, unique: false },
    price: { type: mongoose.SchemaTypes.Number, required: true, unique: false },
    numBeds: { type: mongoose.SchemaTypes.Number, required: true, unique: false },
    numPeople: { type: mongoose.SchemaTypes.Number, required: true, unique: false },
    type: { type: mongoose.SchemaTypes.String, enum: Object.values(TypeRoom), required: true },
}

const collectionName: string = "room"
const roomSchema: mongoose.Schema = new mongoose.Schema(schema)

roomSchema.methods.transform = function () {
    var obj = this.toObject()

    var id = obj._id
    delete obj._id
    obj.id = id

    return obj
}

const RoomModel = (connection: mongoose.Connection): mongoose.Model<IRoom> =>
    connection.model<IRoom>(collectionName, roomSchema)

export default RoomModel
