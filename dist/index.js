"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const port = +process.env.PORT;
const host = process.env.HOST;
const app = (0, express_1.default)();
app.use('/auth', authRoutes_1.default);
app.use('/rooms', roomRoutes_1.default);
app.use('/events', eventRoutes_1.default);
app.all('*', (req, res) => {
    res.status(404).json({ message: 'API Rest | Unknown Route' });
});
app.listen(port, host, () => console.log(`App listening to http://${host}:${port}/`));
