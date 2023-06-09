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
exports.verifyToken = exports.createUser = exports.getUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const provider_1 = require("../database/provider");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const SECRET_KEY = process.env.SECRET_KEY;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get User");
    const { username, password } = req.body;
    let user;
    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password' });
        }
        user = yield (0, userModel_1.default)(provider_1.connection)
            .findOne({ username })
            .exec();
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, userType: user.type }, SECRET_KEY, { expiresIn: '2 days' });
        return res.status(200).json({ message: 'Login successful', accessToken: token });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Create User");
    const { username, password, email, type } = req.body;
    let user;
    try {
        if (!username || !password || !email || !type) {
            return res.status(400).json({ message: 'Please provide username, password, email and type' });
        }
        user = yield (0, userModel_1.default)(provider_1.connection)
            .findOne({ $or: [{ username }, { email }] })
            .exec();
        if (user) {
            return res.status(409).json({ message: 'Username or E-mail already exists' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        user = yield (0, userModel_1.default)(provider_1.connection)
            .create({ username, password: hashedPassword, email, verified: false, type });
        if (!user) {
            return res.status(500).json({ message: 'Failed to create user' });
        }
        const auth = {
            userId: user.id,
            userType: user.type
        };
        return res.status(201).json({ message: 'User created successful', auth });
    }
    catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong...' });
    }
});
exports.createUser = createUser;
function verifyToken(req, res) {
    const header = req.headers.authorization;
    if (typeof header == 'undefined') {
        return res.status(401).json({ message: 'No token provided!' });
    }
    let token, bearer = header.split(' ');
    if (bearer.length == 2)
        token = bearer[1];
    else
        token = header;
    try {
        let decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(decoded);
    }
    catch (error) {
        if (error.name === 'TokenExpiredError')
            return res.status(401).json({ message: 'Whoops, your token has expired! Please login again.' });
        if (error.name === 'JsonWebTokenError')
            return res.status(401).json({ message: 'Malformed JWT' });
        return res.status(401).json({ message: 'Unauthorized!' });
    }
}
exports.verifyToken = verifyToken;
