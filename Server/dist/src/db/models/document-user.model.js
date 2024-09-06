"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentUser = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const permission_enum_1 = __importDefault(require("../../types/enums/permission-enum"));
const user_model_1 = require("./user.model");
const document_model_1 = require("./document.model");
let DocumentUser = class DocumentUser extends sequelize_typescript_1.Model {
};
exports.DocumentUser = DocumentUser;
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM("VIEW", "EDIT")),
    __metadata("design:type", String)
], DocumentUser.prototype, "permission", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], DocumentUser.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], DocumentUser.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => document_model_1.Document),
    __metadata("design:type", document_model_1.Document)
], DocumentUser.prototype, "document", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => document_model_1.Document),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], DocumentUser.prototype, "documentId", void 0);
exports.DocumentUser = DocumentUser = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'document_user', underscored: true })
], DocumentUser);
