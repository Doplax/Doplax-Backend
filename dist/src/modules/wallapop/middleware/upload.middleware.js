"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multerConfig_1 = require("../../../config/multerConfig");
const uploadMiddleware = {
    uploadSingle: multerConfig_1.default.single("photo"),
    uploadMultiple: multerConfig_1.default.array("photos", 5),
};
exports.default = uploadMiddleware;
//# sourceMappingURL=upload.middleware.js.map