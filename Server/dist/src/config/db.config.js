"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const env_config_1 = __importDefault(require("./env.config"));
// Ensure all necessary environment variables are defined
const { NODE_ENV, DATABASE, USER, PASSWORD, DB_HOST, DB_PORT, DATABASE_URL, ACCESS_TOKEN_SECRET, } = env_config_1.default;
if (!NODE_ENV || !DATABASE || !USER || !PASSWORD || !DB_HOST || !DB_PORT || !DATABASE_URL) {
    throw new Error("Missing required environment variables");
}
const sequelize = NODE_ENV === "test" || NODE_ENV === "development"
    ? new sequelize_typescript_1.Sequelize(DATABASE, USER, PASSWORD, {
        host: DB_HOST,
        port: Number(DB_PORT),
        dialect: 'postgres',
        logging: false,
    })
    : new sequelize_typescript_1.Sequelize(DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    });
exports.default = sequelize;
