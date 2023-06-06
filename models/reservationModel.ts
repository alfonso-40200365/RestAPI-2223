import mongoose from "mongoose"

export interface IReservation extends mongoose.Document {
    id: string
    userId: string
    numPeople: number
    dateStart: Date
    dateEnd: Date
    transform: () => IReservation
}

const schema: mongoose.SchemaDefinition = {
    userId: { type: mongoose.SchemaTypes.String, required: true },
    numPeople: { type: mongoose.SchemaTypes.Number, required: true },
    dateStart: { type: mongoose.SchemaTypes.Date, required: true },
    dateEnd: { type: mongoose.SchemaTypes.Date, required: true },
}

const collectionName: string = "reservation"
const reservationSchema: mongoose.Schema = new mongoose.Schema(schema)

reservationSchema.methods.transform = function () {
    const obj = this.toObject()

    const id = obj._id
    delete obj._id
    obj.id = id

    return obj
}

const ReservationModel = (
    connection: mongoose.Connection
): mongoose.Model<IReservation> =>
    connection.model<IReservation>(collectionName, reservationSchema)

export default ReservationModel
