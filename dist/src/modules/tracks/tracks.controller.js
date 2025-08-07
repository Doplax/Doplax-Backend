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
exports.TracksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lofi_music_1 = require("../../../public/music/lofi-music");
const lofi_music_2 = require("../../../public/music/lofi-music");
const User_model_1 = require("../wallapop/models/User.model");
let TracksController = class TracksController {
    async getItems() {
        try {
            const allTracks = [...lofi_music_1.tracksList, ...lofi_music_2.tracksList];
            return { data: allTracks };
        }
        catch (e) {
            throw new Error(e);
        }
    }
    getItem(id) {
        return { message: 'Implementation pending', id };
    }
    async createItem(body) {
        try {
            const { name, age, email } = body;
            const resDetail = await User_model_1.default.create({
                name,
                age,
                email,
            });
            return { data: resDetail };
        }
        catch (e) {
            throw new Error(e);
        }
    }
    updateItem(id, body) {
        return { message: 'Update implementation pending', id, body };
    }
    deleteItem(id) {
        return { message: 'Delete implementation pending', id };
    }
};
exports.TracksController = TracksController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tracks' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all tracks' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TracksController.prototype, "getItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get track by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns a track by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TracksController.prototype, "getItem", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new track' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Track created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TracksController.prototype, "createItem", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update track by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Track updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TracksController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete track by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Track deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TracksController.prototype, "deleteItem", null);
exports.TracksController = TracksController = __decorate([
    (0, swagger_1.ApiTags)('Tracks'),
    (0, common_1.Controller)('api/tracks')
], TracksController);
//# sourceMappingURL=tracks.controller.js.map