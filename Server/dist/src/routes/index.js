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
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const document_route_1 = __importDefault(require("./document.route"));
const auth_1 = require("../middleware/auth");
const role_enum_1 = __importDefault(require("../types/enums/role-enum"));
const router = (0, express_1.Router)();
router.get("/", auth_1.authenticate, (0, auth_1.authorize)([role_enum_1.default.SUPERADMIN]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.sendStatus(200);
}));
router.use("/user", user_route_1.default);
router.use('/auth', auth_route_1.default);
router.use('/document', document_route_1.default);
exports.default = router;
