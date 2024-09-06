"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../../config/db.config"));
const document_user_model_1 = require("./document-user.model");
const refresh_token_model_1 = require("./refresh-token.model");
const role_model_1 = require("./role.model");
const user_role_model_1 = require("./user-role.model");
const user_model_1 = require("./user.model");
const document_model_1 = require("./document.model");
const sequelize_1 = require("sequelize");
db_config_1.default.addModels([
    user_model_1.User,
    refresh_token_model_1.RefreshToken,
    role_model_1.Role,
    user_role_model_1.UserRole,
    document_model_1.Document,
    document_user_model_1.DocumentUser
]);
const db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize: db_config_1.default,
    User: user_model_1.User,
    RefreshToken: refresh_token_model_1.RefreshToken,
    Role: role_model_1.Role,
    UserRole: user_role_model_1.UserRole,
    Document: document_model_1.Document,
    DocumentUser: document_user_model_1.DocumentUser,
};
exports.default = db;
