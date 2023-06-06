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
exports.closeConnection = exports.getConnection = exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.DATABASE_URL;
const getConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connection.readyState !== 1) {
        try {
            yield mongoose_1.default.connect(uri, {
                bufferCommands: false,
                autoIndex: true,
                autoCreate: true,
            });
            console.log('Connection to DB was successful');
            exports.connection = mongoose_1.default.connection;
        }
        catch (error) {
            throw new Error('Connection to DB failed');
        }
    }
    return mongoose_1.default.connection;
});
exports.getConnection = getConnection;
const closeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connection.close();
        console.log('Disconnection from DB was successful');
    }
    catch (error) {
        throw new Error('Disconnection from DB failed');
    }
    return mongoose_1.default.connection;
});
exports.closeConnection = closeConnection;
