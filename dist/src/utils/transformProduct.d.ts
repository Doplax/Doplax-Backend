import { Request } from "express";
interface ProductDoc {
    _doc?: any;
    _id: string;
    photo?: {
        data: any;
    };
    toObject?: () => any;
}
export declare const transformProduct: (product: ProductDoc, req: Request) => any;
export {};
