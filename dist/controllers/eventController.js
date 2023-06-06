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
exports.deleteMyEventById = exports.updateMyEventById = exports.getMyEventById = exports.getMyEvents = exports.createMyEvent = exports.functionTODO = exports.getEventById = exports.getEvents = void 0;
const provider_1 = require("../database/provider");
const eventModel_1 = __importDefault(require("../models/eventModel"));
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getEvents = getEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getEventById = getEventById;
const functionTODO = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.functionTODO = functionTODO;
const createMyEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Create My Event");
    const { ownerId, reviewId, title, description, location, type } = req.body;
    const { authid, authtype } = req.headers;
    let { date } = req.body;
    let event;
    // Se nao inserir uma data usar a data atual
    // Development
    if (!date) {
        date = Date.now();
    }
    try {
        if (!ownerId || !title || !description || !location || !type || !authid || !authtype) {
            return res.status(400).json({ message: 'Please provide ownerId, title, description, location and type' });
        }
        if (authtype !== "admin" && ownerId !== authid) {
            return res.status(403).json({ message: "You are not authorized to perform this request" });
        }
        event = yield (0, eventModel_1.default)(provider_1.connection)
            .findOne({ title });
        if (event) {
            return res.status(409).json({ message: 'Event Title already exists' });
        }
        event = yield (0, eventModel_1.default)(provider_1.connection)
            .create({ ownerId, reviewId, title, description, location, date, type });
        if (!event) {
            return res.status(500).json({ message: 'Failed to create event' });
        }
        return res.status(201).json({ message: 'Event created successful', eventId: event.id });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.createMyEvent = createMyEvent;
const getMyEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getMyEvents = getMyEvents;
const getMyEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getMyEventById = getMyEventById;
const updateMyEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateMyEventById = updateMyEventById;
const deleteMyEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteMyEventById = deleteMyEventById;
