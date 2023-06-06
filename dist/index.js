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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const provider_1 = require("./database/provider");
dotenv_1.default.config();
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const port = +process.env.PORT;
const host = process.env.HOST;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, provider_1.getConnection)();
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use('/', authRoutes_1.default);
        app.use('/rooms', roomRoutes_1.default);
        app.use('/events', eventRoutes_1.default);
        app.use('/admin', adminRoutes_1.default);
        app.all('*', (req, res) => {
            res.status(404).json({ message: 'API Rest | Unknown Route' });
        });
        app.listen(port, host, () => console.log(`App listening to http://${host}:${port}/`));
    }
    catch (error) {
        console.error('Failed to establish MongoDB connection:', error);
        process.exit(1);
    }
}))();
