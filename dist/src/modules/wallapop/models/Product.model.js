"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "The name field is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "The minimum price value is 0"],
        max: [99999, "The maximum price value is 99999"],
    },
    isForSale: {
        type: Boolean,
        default: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    tags: [
        {
            type: String,
            enum: ["Laptop", "Tablet", "Smartphone", "Desktop"],
        },
    ],
}, {
    versionKey: false,
});
const Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
//# sourceMappingURL=Product.model.js.map