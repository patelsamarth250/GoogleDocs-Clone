"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.emailNotVerified = exports.userNotFound = void 0;
const userNotFound = [
    {
        msg: "Your email or password is inccorrect",
    },
];
exports.userNotFound = userNotFound;
const emailNotVerified = [
    {
        msg: "Please verify your email before loggin in",
    }
];
exports.emailNotVerified = emailNotVerified;
const resetPassword = [
    {
        msg: "If a user with that email exists, you will receive a email with instruction to reset your password"
    }
];
exports.resetPassword = resetPassword;
