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
exports.documentController = void 0;
const catch_async_1 = __importDefault(require("../../middleware/catch-async"));
const document_service_1 = __importDefault(require("../../services/document.service"));
const document_model_1 = require("../../db/models/document.model");
const document_user_model_1 = require("../../db/models/document-user.model");
const express_validator_1 = require("express-validator");
class DocumentController {
    constructor() {
        this.getOne = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.user)
                return res.sendStatus(401);
            const { id } = req.params;
            const document = yield document_service_1.default.findDocumentById(parseInt(id), parseInt(req.user.id));
            if (document === null)
                return res.sendStatus(404);
            return res.status(200).json(document);
        }));
        this.getAll = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const documents = yield document_model_1.Document.findAll({
                where: {
                    userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                },
            });
            const documentUsers = yield document_user_model_1.DocumentUser.findAll({
                where: {
                    userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
                },
                include: {
                    model: document_model_1.Document,
                },
            });
            const sharedDocuments = documentUsers.map((documentUser) => documentUser.document);
            documents.push(...sharedDocuments);
            return res.status(200).json(documents);
        }));
        this.update = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const err = (0, express_validator_1.validationResult)(req);
            if (!err.isEmpty()) {
                return res.status(400).json(err);
            }
            if (!req.user)
                return res.sendStatus(401);
            const { id } = req.params;
            const { title, content, isPublic } = req.body;
            const document = yield document_service_1.default.findDocumentById(parseInt(id), parseInt(req.user.id));
            if (document === null)
                return res.sendStatus(404);
            if (title !== undefined && title !== null)
                document.title = title;
            if (content !== undefined && content !== null)
                document.content = content;
            if (isPublic !== undefined && isPublic !== null)
                document.isPublic = isPublic;
            yield document.save();
            return res.sendStatus(200);
        }));
        this.create = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            const document = yield document_model_1.Document.create({
                userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id,
            });
            return res.status(201).json(document);
        }));
        this.delete = (0, catch_async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            const { id } = req.params;
            yield document_model_1.Document.destroy({
                where: {
                    id: id,
                    userId: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id,
                },
            });
            return res.sendStatus(200);
        }));
    }
}
const documentController = new DocumentController();
exports.documentController = documentController;
