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
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_role_model_1 = require("../db/models/user-role.model");
const role_model_1 = require("../db/models/role.model");
const env_config_1 = __importDefault(require("../config/env.config"));
const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    jsonwebtoken_1.default.verify(token, env_config_1.default.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.sendStatus(403);
        try {
            const { id, email, roles } = decoded;
            req.user = { id, email, roles };
            next();
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(403);
        }
    });
};
exports.authenticate = authenticate;
const authorize = (permittedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.sendStatus(401);
        const userId = req.user.id;
        user_role_model_1.UserRole.findAll({ where: { userId }, include: role_model_1.Role })
            .then((data) => {
            const roles = data.map((userRole) => userRole.role.name);
            if (permittedRoles.some((permittedRole) => roles.includes(permittedRole))) {
                next();
            }
            else {
                return res.sendStatus(403);
            }
        })
            .catch((error) => {
            console.log(error);
            return res.sendStatus(403);
        });
    });
};
exports.authorize = authorize;
