import { Document } from "mongoose";
export type Tag = "Laptop" | "Tablet" | "Smartphone" | "Desktop";
export interface ProductData {
    name: string;
    price: number;
    isForSale?: boolean;
    photo?: {
        data: Buffer | null;
        contentType: string;
    };
    tags?: Tag[];
}
export interface IProduct extends ProductData, Document {
}
declare const Product: import("mongoose").Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct> & IProduct & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default Product;
