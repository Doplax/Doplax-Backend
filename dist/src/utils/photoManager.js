"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldPhotoAndThumbnail = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const deleteOldPhotoAndThumbnail = async (currentPhoto) => {
    if (currentPhoto) {
        const oldPhotoPath = path_1.default.join(__dirname, "..", "..", "public", "images", currentPhoto);
        const oldThumbnailPath = path_1.default.join(__dirname, "..", "..", "public", "thumbnails", `thumb-${currentPhoto}`);
        try {
            if (fs_1.default.existsSync(oldPhotoPath)) {
                fs_1.default.unlinkSync(oldPhotoPath);
            }
        }
        catch (error) {
            console.error(`Error deleting the old photo: ${error.message}`);
        }
        try {
            if (fs_1.default.existsSync(oldThumbnailPath)) {
                fs_1.default.unlinkSync(oldThumbnailPath);
            }
        }
        catch (error) {
            console.error(`Error deleting the thumbnail: ${error.message}`);
        }
    }
};
exports.deleteOldPhotoAndThumbnail = deleteOldPhotoAndThumbnail;
//# sourceMappingURL=photoManager.js.map