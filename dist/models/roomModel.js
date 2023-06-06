"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var TypeRoom;
(function (TypeRoom) {
    TypeRoom["QuartoPrivado"] = "quarto privado";
    TypeRoom["QuartoPartilhado"] = "quarto partilhado";
    TypeRoom["Apartamento"] = "apartamento";
    TypeRoom["Casa"] = "casa";
    TypeRoom["Moradia"] = "moradia";
})(TypeRoom || (TypeRoom = {}));
const schema = {
    ownerId: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    reviewId: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    reservationId: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    title: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    description: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    location: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    availability: { type: mongoose_1.default.SchemaTypes.Boolean, required: true, unique: false },
    price: { type: mongoose_1.default.SchemaTypes.Number, required: true, unique: false },
    numBeds: { type: mongoose_1.default.SchemaTypes.Number, required: true, unique: false },
    numPeople: { type: mongoose_1.default.SchemaTypes.Number, required: true, unique: false },
    type: { type: mongoose_1.default.SchemaTypes.String, enum: Object.values(TypeRoom), required: true },
};
const collectionName = "room";
const roomSchema = new mongoose_1.default.Schema(schema);
roomSchema.methods.transform = function () {
    var obj = this.toObject();
    var id = obj._id;
    delete obj._id;
    obj.id = id;
    return obj;
};
const RoomModel = (connection) => connection.model(collectionName, roomSchema);
exports.default = RoomModel;
