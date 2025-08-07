"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_model_1 = require("../models/Product.model");
const errorHandler_1 = require("../../../utils/errorHandler");
const verifyProductExists = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product_model_1.default.findById(id);
        if (!product) {
            (0, errorHandler_1.default)(res, "PRODUCT_NOT_FOUND", 404);
            return;
        }
        next();
    }
    catch (error) {
        (0, errorHandler_1.default)(res, `ERROR VERIFYING PRODUCT: ${error.message}`, 500);
    }
};
exports.default = verifyProductExists;
//# sourceMappingURL=verify-product-exists.middleware.js.map