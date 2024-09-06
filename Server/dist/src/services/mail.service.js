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
exports.mailservice = void 0;
const smtp_config_1 = __importDefault(require("../config/smtp.config"));
// create a class that will help us to send messages to the users
class MailService {
    constructor() {
        this.sendMail = (mailOptions) => __awaiter(this, void 0, void 0, function* () {
            smtp_config_1.default.sendMail(mailOptions);
        });
    }
}
const mailservice = new MailService();
exports.mailservice = mailservice;
