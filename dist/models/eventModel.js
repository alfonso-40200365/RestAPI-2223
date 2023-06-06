"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var TypeEvent;
(function (TypeEvent) {
    TypeEvent["Lazer"] = "lazer";
    TypeEvent["Cultural"] = "cultural";
    TypeEvent["Academico"] = "academico";
    TypeEvent["Gala"] = "gala";
})(TypeEvent || (TypeEvent = {}));
const schema = {
    ownerId: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    reviewId: { type: mongoose_1.default.SchemaTypes.String, required: false, unique: false },
    title: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    description: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    location: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    date: { type: mongoose_1.default.SchemaTypes.Date, required: true, unique: false },
    type: { type: mongoose_1.default.SchemaTypes.String, enum: Object.values(TypeEvent), required: true },
};
const collectionName = "event";
const eventSchema = new mongoose_1.default.Schema(schema);
eventSchema.methods.transform = function () {
    var obj = this.toObject();
    var id = obj._id;
    delete obj._id;
    obj.id = id;
    return obj;
};
const EventModel = (connection) => connection.model(collectionName, eventSchema);
exports.default = EventModel;
