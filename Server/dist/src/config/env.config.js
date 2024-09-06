"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
console.log(process.env.DATABASE);
// console.log(process.env.ACCESS_TOKEN_SECRET)
if (!process.env.NODE_ENV ||
    !process.env.HOST ||
    !process.env.PORT ||
    !process.env.DATABASE_URL ||
    !process.env.USER ||
    !process.env.PASSWORD ||
    !process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DATABASE ||
    !process.env.ACCESS_TOKEN_SECRET ||
    !process.env.VERIFY_EMAIL_SECRET ||
    !process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("Environment Variables are missing");
}
const env = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DATABASE: process.env.DATABASE,
    SMTP_PASS: process.env.SMTP_PASS,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    VERIFY_EMAIL_SECRET: process.env.VERIFY_EMAIL_SECRET
};
exports.default = env;
