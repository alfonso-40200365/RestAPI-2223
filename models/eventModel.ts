import mongoose from "mongoose"

enum TypeEvent {
  Lazer = "lazer",
  Cultural = "cultural",
  Academico = "academico",
  Gala = "gala",
}

export interface IEvent extends mongoose.Document {
  id: string
  ownerId: string
  reviewId: string
  title: string
  description: string
  location: string
  date: Date
  type: TypeEvent
  transform: () => IEvent
}

const schema: mongoose.SchemaDefinition = {
  ownerId: { type: mongoose.SchemaTypes.String, required: true, unique: false },
  reviewId: { type: mongoose.SchemaTypes.String, required: false, unique: false },
  title: { type: mongoose.SchemaTypes.String, required: true, unique: false },
  description: { type: mongoose.SchemaTypes.String, required: true, unique: false },
  location: { type: mongoose.SchemaTypes.String, required: true, unique: false },
  date: { type: mongoose.SchemaTypes.Date, required: true, unique: false },
  type: { type: mongoose.SchemaTypes.String, enum: Object.values(TypeEvent), required: true },
}

const collectionName: string = "event"
const eventSchema: mongoose.Schema = new mongoose.Schema(schema)

eventSchema.methods.transform = function () {
  var obj = this.toObject()

  var id = obj._id
  delete obj._id
  obj.id = id

  return obj
}

const EventModel = (connection: mongoose.Connection): mongoose.Model<IEvent> =>
  connection.model<IEvent>(collectionName, eventSchema)

export default EventModel
