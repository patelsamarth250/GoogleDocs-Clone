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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const refresh_token_model_1 = require("./refresh-token.model");
const user_role_model_1 = require("./user-role.model");
const role_model_1 = require("./role.model");
const document_user_model_1 = require("./document-user.model");
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "verificationToken", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "passwordResetToken", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => refresh_token_model_1.RefreshToken, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "refreshTokens", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => role_model_1.Role, {
        through: {
            model: () => user_role_model_1.UserRole
        }
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_role_model_1.UserRole, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], User.prototype, "userRoles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => document_user_model_1.DocumentUser, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], User.prototype, "sharedDocumnents", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Scopes)(() => ({
        withRoles: {
            include: [
                {
                    model: user_role_model_1.UserRole,
                    attributes: ['createdAt', 'updatedAt'],
                    include: [role_model_1.Role]
                }
            ]
        }
    })),
    (0, sequelize_typescript_1.Table)({ tableName: 'user', underscored: true })
], User);
