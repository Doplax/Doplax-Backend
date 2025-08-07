"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformProduct = void 0;
const transformProduct = (product, req) => {
    const productData = product._doc || product.toObject?.() || product;
    const { photo, ...rest } = productData;
    return {
        ...rest,
        imgSrc: photo?.data
            ? `${req.protocol}://${req.get("host")}/api/images/${product._id}`
            : null,
    };
};
exports.transformProduct = transformProduct;
//# sourceMappingURL=transformProduct.js.map