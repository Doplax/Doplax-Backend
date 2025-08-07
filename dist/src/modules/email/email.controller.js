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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nodemailerConfig_1 = require("../../config/nodemailerConfig");
const contactMeTemplate_1 = require("./templates/contactMeTemplate");
let EmailController = class EmailController {
    async contactMe(body) {
        try {
            const { name, email, message } = body;
            const subject = 'Nuevo mensaje de contacto';
            const mailOptions = {
                from: process.env.EMAIL_FROM || email,
                to: email,
                ...(0, contactMeTemplate_1.default)({ name, email, subject, message })
            };
            const result = await (0, nodemailerConfig_1.sendEmail)(mailOptions);
            console.log('Email sent:', result, { name, email, message });
            return { data: result };
        }
        catch (e) {
            throw new Error(e);
        }
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('contactMe'),
    (0, swagger_1.ApiOperation)({ summary: 'Send contact email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email sent successfully' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error sending email' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "contactMe", null);
exports.EmailController = EmailController = __decorate([
    (0, swagger_1.ApiTags)('Email'),
    (0, common_1.Controller)('api/email')
], EmailController);
//# sourceMappingURL=email.controller.js.map