"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var TypeRole;
(function (TypeRole) {
    TypeRole["Admin"] = "admin";
    TypeRole["Owner"] = "owner";
    TypeRole["Student"] = "student";
})(TypeRole || (TypeRole = {}));
const schema = {
    username: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    password: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    email: { type: mongoose_1.default.SchemaTypes.String, required: true, unique: false },
    verified: { type: mongoose_1.default.SchemaTypes.Boolean, required: true },
    type: { type: mongoose_1.default.SchemaTypes.String, enum: Object.values(TypeRole), required: true },
};
const collectionName = "user";
const userSchema = new mongoose_1.default.Schema(schema);
userSchema.methods.transform = function () {
    var obj = this.toObject();
    var id = obj._id;
    delete obj._id;
    obj.id = id;
    return obj;
};
const UserModel = (connection) => connection.model(collectionName, userSchema);
exports.default = UserModel;
