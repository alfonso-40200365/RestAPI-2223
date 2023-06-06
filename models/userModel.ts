import mongoose from "mongoose"

enum TypeRole {
  Admin = "admin",
  Owner = "owner",
  Student = "student",
}

export interface IUser extends mongoose.Document {
  id: string
  username: string
  password: string
  email: string
  verified: boolean
  type: TypeRole
  transform: () => IUser
}

const schema: mongoose.SchemaDefinition = {
  username: { type: mongoose.SchemaTypes.String, required: true, unique: false },
  password: { type: mongoose.SchemaTypes.String, required: true, unique: false },
  email: { type: mongoose.SchemaTypes.String, required: true, unique: false },
  verified: { type: mongoose.SchemaTypes.Boolean, required: true },
  type: { type: mongoose.SchemaTypes.String, enum: Object.values(TypeRole), required: true },
}

const collectionName: string = "user"
const userSchema: mongoose.Schema = new mongoose.Schema(schema)

userSchema.methods.transform = function () {
  var obj = this.toObject()

  var id = obj._id
  delete obj._id
  obj.id = id

  return obj
}

const UserModel = (connection: mongoose.Connection): mongoose.Model<IUser> =>
  connection.model<IUser>(collectionName, userSchema)

export default UserModel
