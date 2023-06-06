"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = {
    userId: { type: mongoose_1.default.SchemaTypes.String, required: true },
    numPeople: { type: mongoose_1.default.SchemaTypes.Number, required: true },
    dateStart: { type: mongoose_1.default.SchemaTypes.Date, required: true },
    dateEnd: { type: mongoose_1.default.SchemaTypes.Date, required: true },
};
const collectionName = "reservation";
const reservationSchema = new mongoose_1.default.Schema(schema);
reservationSchema.methods.transform = function () {
    const obj = this.toObject();
    const id = obj._id;
    delete obj._id;
    obj.id = id;
    return obj;
};
const ReservationModel = (connection) => connection.model(collectionName, reservationSchema);
exports.default = ReservationModel;
