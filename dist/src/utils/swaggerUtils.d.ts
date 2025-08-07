import { Schema } from "mongoose";
interface SwaggerProperty {
    type: string;
    enum?: string[];
    minimum?: number;
    maximum?: number;
    default?: unknown;
}
interface SwaggerSchema {
    type: "object";
    required?: string[];
    properties: Record<string, SwaggerProperty>;
}
export declare function generateSwaggerSchema(mongooseSchema: Schema): SwaggerSchema;
export {};
