// Images Module Exports
import { getImage } from './imagesController';

export { getImage } from './imagesController';
export { default as imagesRoutes } from './images';
export { default as upload } from './multerConfig';
export { default as uploadMiddleware } from './uploadMiddleware';
export { deleteOldPhotoAndThumbnail } from './photoManager';

// Create aliases for expected export names
export const uploadImageCtrl = undefined; // This function doesn't exist in original
export const getImageCtrl = getImage;
export const deleteImageCtrl = undefined; // This function doesn't exist in original  
export const deleteAllImagesCtrl = undefined; // This function doesn't exist in original