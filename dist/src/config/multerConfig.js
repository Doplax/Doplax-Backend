"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
const fileStorage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: fileStorage,
});
exports.default = upload;
//# sourceMappingURL=multerConfig.js.map