"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const transporter = (0, nodemailer_1.createTransport)({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "satyampundir03@gmail.com",
        pass: "vrbc nvam ckvb vsds",
    },
    secure: true,
});
exports.default = transporter;
