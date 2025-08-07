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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const User_model_1 = require("../wallapop/models/User.model");
const handlePassword_1 = require("../../utils/handlePassword");
const handleJwt_1 = require("../../utils/handleJwt");
const auth_dto_1 = require("./dto/auth.dto");
let AuthController = class AuthController {
    async register(registerDto) {
        try {
            const userExists = await User_model_1.default.findOne({ email: registerDto.email });
            if (userExists) {
                throw new common_1.HttpException('ERROR_REGISTER_USER_ALREADY_EXISTS', common_1.HttpStatus.CONFLICT);
            }
            const password = await (0, handlePassword_1.encrypt)(registerDto.password);
            const body = { ...registerDto, password };
            const dataUser = await User_model_1.default.create(body);
            dataUser.set('password', undefined, { strict: false });
            const result = {
                token: await (0, handleJwt_1.tokenSign)(dataUser),
                user: dataUser,
            };
            return { data: result };
        }
        catch (e) {
            console.error(e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw new common_1.HttpException('ERROR_REGISTER_USER', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(loginDto) {
        try {
            const user = await User_model_1.default.findOne({ email: loginDto.email });
            if (!user) {
                throw new common_1.HttpException('USER_NOT_EXISTS', common_1.HttpStatus.NOT_FOUND);
            }
            const hashPassword = user.get('password');
            const check = await (0, handlePassword_1.compare)(loginDto.password, hashPassword);
            if (!check) {
                throw new common_1.HttpException('PASSWORD_INVALID', common_1.HttpStatus.UNAUTHORIZED);
            }
            const token = await (0, handleJwt_1.tokenSign)(user);
            return { token };
        }
        catch (e) {
            console.error(e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            throw new common_1.HttpException('ERROR_LOGIN_USER', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllUsers() {
        try {
            const users = await User_model_1.default.find({});
            return users;
        }
        catch (e) {
            console.error(e);
            throw new common_1.HttpException('ERROR_GET_ALL_USERS', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Registro de usuarios' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuario registrado exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error de validación.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Usuario ya existe.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Inicio de sesión de usuarios' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inicio de sesión exitoso.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciales inválidas.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene la lista de todos los usuarios' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retorna una lista de usuarios.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllUsers", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('api/auth')
], AuthController);
//# sourceMappingURL=auth.controller.js.map