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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMyRoomById = exports.updateMyRoomById = exports.getMyRoomById = exports.getMyRooms = exports.createMyRoom = exports.getRoomByIdReview = exports.getRoomByIdComment = exports.getRoomByIdLike = exports.getRoomById = exports.getRooms = void 0;
const provider_1 = require("../database/provider");
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const roomModel_1 = __importDefault(require("../models/roomModel"));
const reservationModel_1 = __importDefault(require("../models/reservationModel"));
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get Rooms");
    let rooms = [];
    try {
        const { date, type, title, price, numBeds, numPeople, location } = req.query;
        const filters = {};
        if (typeof date === 'string') {
            filters.date = { $gte: new Date(date) };
        }
        if (type) {
            filters.type = type;
        }
        if (title) {
            filters.title = { $regex: title, $options: 'i' };
        }
        if (price) {
            filters.price = { $lte: Number(price) };
        }
        if (numBeds) {
            filters.numBeds = { $gte: Number(numBeds) };
        }
        if (numPeople) {
            filters.numPeople = { $gte: Number(numPeople) };
        }
        if (location) {
            filters.location = { $regex: location, $options: 'i' };
        }
        rooms = yield (0, roomModel_1.default)(provider_1.connection).find(filters);
        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: 'No rooms found' });
        }
        return res.status(200).json({ message: 'Rooms retrieved successfully', rooms });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.getRooms = getRooms;
const getRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Get Room by ID');
    const { id } = req.params;
    let room;
    let review;
    let reservation = null;
    try {
        room = yield (0, roomModel_1.default)(provider_1.connection).findById(id).exec();
        review = yield (0, reviewModel_1.default)(provider_1.connection).findOne({ roomId: id });
        if (room) {
            reservation = yield (0, reservationModel_1.default)(provider_1.connection).findById(room.reservationId).exec();
        }
        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` });
        }
        review = review ? review.transform() : null;
        reservation = reservation ? reservation.transform() : null;
        return res.status(200).json({ message: 'Room retrieved successfully', room: room, review: review });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.getRoomById = getRoomById;
const getRoomByIdLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Get Room by ID and Like');
    const authId = req.userId;
    const { id } = req.params;
    let room;
    let review;
    try {
        room = yield (0, roomModel_1.default)(provider_1.connection).findById(id).exec();
        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` });
        }
        if (room.reviewId) {
            review = yield (0, reviewModel_1.default)(provider_1.connection).findById(room.reviewId).exec();
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            const userLikeIndex = review.likes.findIndex((like) => like.userId === authId);
            if (userLikeIndex !== -1) {
                const userLike = review.likes[userLikeIndex];
                if (userLike.like === true) {
                    userLike.like = false;
                    yield review.save();
                    return res.status(200).json({ message: 'Review like updated to false', review: review.id });
                }
                else {
                    userLike.like = true;
                    yield review.save();
                    return res.status(200).json({ message: 'Review liked successfully', review: review.id });
                }
            }
            review.likes.push({ userId: authId, like: true });
            yield review.save();
            return res.status(200).json({ message: 'Review liked successfully', review: review.id });
        }
        const reviewArgs = {
            ratings: [],
            comments: [],
            likes: [{ userId: authId, like: true }]
        };
        review = yield (0, reviewModel_1.default)(provider_1.connection)
            .create(reviewArgs);
        review.transform();
        room.reviewId = review.id;
        yield room.save();
        return res.status(200).json({ message: 'Review created and liked successfully', review: review.id });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.getRoomByIdLike = getRoomByIdLike;
const getRoomByIdComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Get Room by ID and Comment');
    const authId = req.userId;
    const { id } = req.params;
    const { comment } = req.body;
    let room;
    let review;
    try {
        room = yield (0, roomModel_1.default)(provider_1.connection).findById(id).exec();
        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` });
        }
        if (room.reviewId) {
            review = yield (0, reviewModel_1.default)(provider_1.connection).findById(room.reviewId).exec();
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            if (!comment) {
                return res.status(400).json({ message: 'Please provide comment' });
            }
            review.comments.push({
                userId: authId,
                comment,
                timeStamp: new Date()
            });
            yield review.save();
            return res.status(200).json({ message: 'Comment added successfully', review: review.id });
        }
        const reviewArgs = {
            ratings: [],
            comments: [{ userId: authId, comment, timeStamp: new Date() }],
            likes: []
        };
        review = yield (0, reviewModel_1.default)(provider_1.connection).create(reviewArgs);
        review.transform();
        room.reviewId = review.id;
        yield room.save();
        return res.status(200).json({ message: 'Review created and comment added successfully', review: review.id });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.getRoomByIdComment = getRoomByIdComment;
const getRoomByIdReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Get Room by ID and Review');
    const authId = req.userId;
    const { id } = req.params;
    let room;
    let review;
    try {
        room = yield (0, roomModel_1.default)(provider_1.connection).findById(id).exec();
        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` });
        }
        // Check if the user has already reviewed the room
        review = yield (0, reviewModel_1.default)(provider_1.connection).findOne({ 'ratings.userId': authId }).exec();
        if (review) {
            return res.status(409).json({ message: 'You have already reviewed this room' });
        }
        const { rating } = req.body;
        if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Invalid rating. Please provide a number from 1 to 5' });
        }
        // Create a new review
        review = yield (0, reviewModel_1.default)(provider_1.connection).create({
            ratings: [{ userId: authId, rating }],
            comments: [],
            likes: [],
        });
        review.transform();
        // Update the room with the new review ID
        room.reviewId = review.id;
        yield room.save();
        return res.status(200).json({ message: 'Review created successfully', review: review.id });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.getRoomByIdReview = getRoomByIdReview;
const createMyRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Create My Room');
    const { title, description, location, availability, price, numBeds, numPeople, type } = req.body;
    const authId = req.userId;
    const authType = req.userType;
    let room;
    try {
        if (!title || !description || !location || !availability || !price || !numBeds || !numPeople || !type) {
            return res.status(400).json({ message: 'Please provide all the required fields' });
        }
        if (authType == "student") {
            return res.status(403).json({ message: "You are not authorized to perform this request" });
        }
        room = yield (0, roomModel_1.default)(provider_1.connection)
            .create({ authId, reviewId: "", reservationId: [], title, description, location, availability, price, numBeds, numPeople, type, });
        if (!room) {
            return res.status(500).json({ message: 'Failed to create room' });
        }
        return res.status(201).json({ message: 'Room created successfully', roomId: room.id });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...', error: error });
    }
});
exports.createMyRoom = createMyRoom;
const getMyRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get My Rooms");
    const authId = req.userId;
    const authType = req.userType;
    try {
        if (authType == "student") {
            return res.status(403).json({ message: 'Your not allowed to perform this request' });
        }
        const rooms = yield (0, roomModel_1.default)(provider_1.connection)
            .find({ ownerId: authId });
        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: `No rooms found for owner: ${authId}` });
        }
        return res.status(200).json({ message: `Rooms of owner: ${authId}`, rooms });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.getMyRooms = getMyRooms;
const getMyRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get My Room by ID");
    const authId = req.userId;
    const authType = req.userType;
    const { id } = req.params;
    let room;
    let review;
    try {
        if (authType == "student" || (authId !== id && authType !== "admin")) {
            return res.status(403).json({ message: 'Your not allowed to perform this request' });
        }
        room = yield (0, roomModel_1.default)(provider_1.connection).findById(id).exec();
        review = yield (0, reviewModel_1.default)(provider_1.connection).findOne({ roomId: id });
        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` });
        }
        return res.status(200).json({ message: 'Room retrieved successfully', room: room, review: review });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.getMyRoomById = getMyRoomById;
const updateMyRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Update My Room by ID');
    const { id } = req.params;
    const _a = req.body, { ownerId, reviewId } = _a, updatedFields = __rest(_a, ["ownerId", "reviewId"]);
    const authId = req.userId;
    const authType = req.userType;
    try {
        if (authType == "student" || (authId !== id && authType !== "admin")) {
            return res.status(403).json({ message: 'Your not allowed to perform this request' });
        }
        const room = yield (0, roomModel_1.default)(provider_1.connection).findByIdAndUpdate(id, updatedFields, { new: true }).exec();
        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` });
        }
        return res.status(200).json({ message: 'Room updated successfully', room: room });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.updateMyRoomById = updateMyRoomById;
const deleteMyRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Delete My Room by ID");
    const authId = req.userId;
    const authType = req.userType;
    const { id } = req.params;
    let room;
    try {
        if (authType === "student" || (authId !== id && authType !== "admin")) {
            return res.status(403).json({ message: 'You are not allowed to perform this request' });
        }
        room = yield (0, roomModel_1.default)(provider_1.connection).findByIdAndDelete(id).exec();
        yield (0, reviewModel_1.default)(provider_1.connection).findOneAndDelete({ roomId: id });
        if (!room) {
            return res.status(404).json({ message: `No room found for ID: ${id}` });
        }
        if (room.reservationId) {
            yield (0, reservationModel_1.default)(provider_1.connection).findByIdAndDelete(room.reservationId).exec();
        }
        return res.status(200).json({ message: 'Room, Reviews, and Reservation deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.deleteMyRoomById = deleteMyRoomById;
