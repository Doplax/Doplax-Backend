"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSwaggerSchema = generateSwaggerSchema;
function generateSwaggerSchema(mongooseSchema) {
    const swaggerSchema = {
        type: "object",
        properties: {},
    };
    Object.entries(mongooseSchema.paths).forEach(([key, value]) => {
        if (key === "_id" || key === "__v")
            return;
        const fieldSchema = {
            type: mapMongooseTypeToSwaggerType(value.instance),
        };
        if (value.options.required) {
            swaggerSchema.required = swaggerSchema.required || [];
            swaggerSchema.required.push(key);
        }
        if (value.options.enum) {
            fieldSchema.enum = value.options.enum;
        }
        if (value.options.min !== undefined) {
            fieldSchema.minimum = value.options.min;
        }
        if (value.options.max !== undefined) {
            fieldSchema.maximum = value.options.max;
        }
        if (value.options.default !== undefined) {
            fieldSchema.default = value.options.default;
        }
        swaggerSchema.properties[key] = fieldSchema;
    });
    return swaggerSchema;
}
function mapMongooseTypeToSwaggerType(type) {
    switch (type) {
        case "String":
            return "string";
        case "Number":
            return "number";
        case "Boolean":
            return "boolean";
        case "Array":
            return "array";
        case "ObjectId":
            return "string";
        default:
            return "string";
    }
}
//# sourceMappingURL=swaggerUtils.js.map