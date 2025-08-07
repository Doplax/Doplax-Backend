"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const handleJwt_1 = require("../../utils/handleJwt");
const User_model_1 = require("../wallapop/models/User.model");
let AuthGuard = class AuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        try {
            if (!request.headers.authorization) {
                throw new common_1.UnauthorizedException('ERROR_AUTHENTICATION: Missing authorization header.');
            }
            const token = request.headers.authorization.split(' ').pop();
            if (!token) {
                throw new common_1.UnauthorizedException('ERROR_TOKEN: No token provided.');
            }
            const dataToken = await (0, handleJwt_1.verifyToken)(token);
            if (!dataToken) {
                throw new common_1.UnauthorizedException('ERROR_TOKEN: The token is invalid or has expired.');
            }
            const user = await User_model_1.default.findOne({ _id: dataToken._id });
            if (!user) {
                throw new common_1.UnauthorizedException('ERROR_USER: No user associated with the provided token was found.');
            }
            request.user = dataToken;
            return true;
        }
        catch (e) {
            if (e instanceof common_1.UnauthorizedException) {
                throw e;
            }
            throw new common_1.UnauthorizedException('ERROR_SESSION: Issue processing the session, possible server error or malformed token.');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map