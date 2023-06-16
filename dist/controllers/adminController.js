"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOwnerById = exports.getOwners = exports.getOwnerById = void 0;
const provider_1 = require("../database/provider");
const userModel_1 = __importDefault(require("../models/userModel"));
const getOwnerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get Owner by ID");
    const authType = req.userType;
    const { id } = req.params;
    let user;
    try {
        if (authType !== "admin") {
            return res.status(403).json({ message: 'Your not allowed to perform this request' });
        }
        user = yield (0, userModel_1.default)(provider_1.connection).findById(id).exec();
        if (!user) {
            return res.status(404).json({ message: `No Owners found for ID: ${id}` });
        }
        return res.status(200).json({ message: 'Owners retrieved successfully', owner: user });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.getOwnerById = getOwnerById;
const getOwners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get Owners");
    const authType = req.userType;
    let users = [];
    try {
        if (authType !== "admin") {
            return res.status(403).json({ message: 'You are not allowed to perform this request' });
        }
        users = yield (0, userModel_1.default)(provider_1.connection).find({ type: "owner" }).exec();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No Owners found' });
        }
        return res.status(200).json({ message: 'Owners retrieved successfully', owners: users });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.getOwners = getOwners;
const updateOwnerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Update Owner by ID");
    const authType = req.userType;
    const { id } = req.params;
    let user;
    try {
        if (authType !== "admin") {
            return res.status(403).json({ message: 'Your not allowed to perform this request' });
        }
        user = yield (0, userModel_1.default)(provider_1.connection).findById(id).exec();
        if (!user) {
            return res.status(404).json({ message: `No Owners found for ID: ${id}` });
        }
        user.verified = !user.verified;
        user = yield user.save();
        return res.status(200).json({ message: 'Owners updated successfully', verified: user.verified });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.updateOwnerById = updateOwnerById;
