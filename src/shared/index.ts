// Shared Module Exports

// Models
export { default as User } from './models/User';
export { default as Product } from './models/Product';

// Utils
export { default as handleHttpError } from './utils/errorHandler';
export { encrypt, compare } from './utils/handlePassword';
export { tokenSign, verifyToken } from './utils/handleJwt';
export { default as handleValidatorsResult } from './utils/handleValidators';
export { transformProduct } from './utils/transformProduct';

// Config
export { default as connectDB } from './config/mongo';
export { default as i18n } from './config/i18nConfigure';
export { default as swaggerConfig } from './config/swaggerConfig';

// Middlewares
export { default as authMiddleware } from './middlewares/authMiddleware';
export { default as verifyProductExists } from './middlewares/verifyProductExists';

// Docs
export * from './docs/index';