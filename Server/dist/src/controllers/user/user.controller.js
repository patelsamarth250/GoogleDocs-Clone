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
exports.userController = void 0;
const express_validator_1 = require("express-validator");
const catch_async_1 = __importDefault(require("../../middleware/catch-async"));
const user_services_1 = require("../../services/user.services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responses_1 = require("../../responses");
const env_config_1 = __importDefault(require("../../config/env.config"));
class UserController {
    constructor() {
        this.register = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const err = (0, express_validator_1.validationResult)(req);
            if (!err.isEmpty) {
                return res.status(400).json(err);
            }
            const { email, password1 } = req.body;
            if (yield user_services_1.userService.findUserByEmail(email))
                return res.sendStatus(409); // if user already exists then through this error.
            yield user_services_1.userService.createUser(email, password1);
            return res.sendStatus(200);
        }));
        this.getUser = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            const user = yield user_services_1.userService.findUserById(userId);
            if (user === null)
                return res.sendStatus(400);
            return res.status(200).json(user);
        }));
        // code for veriying the email:
        this.verifyEmail = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const verificationToken = req.params.token;
            jsonwebtoken_1.default.verify(verificationToken, env_config_1.default.VERIFY_EMAIL_SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return res.sendStatus(403);
                try {
                    const { email } = decoded;
                    user_services_1.userService
                        .findUserByVerificationToken(email, verificationToken)
                        .then((user) => {
                        if (!user || user.isVerified) {
                            return res.sendStatus(400);
                        }
                        user_services_1.userService
                            .updateIsVerified(user, true)
                            .then(() => {
                            return res.sendStatus(200);
                        })
                            .catch(() => {
                            return res.sendStatus(500);
                        });
                    })
                        .catch(() => {
                        return res.sendStatus(500);
                    });
                }
                catch (error) {
                    console.log(error);
                    return res.sendStatus(403);
                }
            }));
        }));
        this.resetPassword = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const err = (0, express_validator_1.validationResult)(req);
            if (!err.isEmpty()) {
                return res.status(400).json(err);
            }
            const { email } = req.body;
            const user = yield user_services_1.userService.findUserByEmail(email);
            if (!user)
                return res.status(200).json(responses_1.resetPassword);
            yield user_services_1.userService.resetPassword(user);
            return res.status(200).json(responses_1.resetPassword);
        }));
        this.confirmResetPassword = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const err = (0, express_validator_1.validationResult)(req);
            if (!err.isEmpty()) {
                return res.status(400).json(err);
            }
            const resetPasswordToken = req.params.token;
            const { password1 } = req.body;
            jsonwebtoken_1.default.verify(resetPasswordToken, "password_reset", (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return res.sendStatus(403);
                try {
                    const { email } = decoded;
                    user_services_1.userService
                        .findUserByPasswordResetToken(email, resetPasswordToken)
                        .then((user) => {
                        if (!user) {
                            return res.sendStatus(400);
                        }
                        user_services_1.userService
                            .updatePassword(user, password1)
                            .then(() => {
                            return res.sendStatus(200);
                        })
                            .catch(() => {
                            return res.sendStatus(500);
                        });
                    })
                        .catch(() => {
                        return res.sendStatus(500);
                    });
                }
                catch (error) {
                    console.log(error);
                    return res.sendStatus(403);
                }
            }));
        }));
    }
}
const userController = new UserController();
exports.userController = userController;
