"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ratingSchema = {
    userId: { type: mongoose_1.default.SchemaTypes.String, required: true },
    rating: { type: mongoose_1.default.SchemaTypes.Number, required: true },
};
const commentSchema = {
    userId: { type: mongoose_1.default.SchemaTypes.String, required: true },
    comment: { type: mongoose_1.default.SchemaTypes.String, required: true },
    timeStamp: { type: mongoose_1.default.SchemaTypes.Date, required: true },
};
const likeSchema = {
    userId: { type: mongoose_1.default.SchemaTypes.String, required: true },
    like: { type: mongoose_1.default.SchemaTypes.Boolean, required: true },
};
const schema = {
    ratings: { type: [ratingSchema], required: true },
    comments: { type: [commentSchema], required: true },
    likes: { type: [likeSchema], required: true },
};
const collectionName = "review";
const reviewSchema = new mongoose_1.default.Schema(schema);
reviewSchema.methods.transform = function () {
    const obj = this.toObject();
    const id = obj._id;
    delete obj._id;
    obj.id = id;
    return obj;
};
const ReviewModel = (connection) => connection.model(collectionName, reviewSchema);
exports.default = ReviewModel;
