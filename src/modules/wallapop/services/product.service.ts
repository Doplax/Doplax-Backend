import Product from "@/modules/wallapop/models/Product.model";
import { transformProduct } from "@/shared/utils/transformProduct";
import { Request } from "express";

export class ProductService {
  async findAll(req: Request) {
    const products = await Product.find({});
    return products.map((product) => transformProduct(product, req));
  }

  async findById(id: string, req: Request) {
    const product = await Product.findById(id);
    if (!product) return null;
    return transformProduct(product, req);
  }

  async create(data: any, file: Express.Multer.File) {
    const product = await Product.create({
      ...data,
      photo: {
        data: file.buffer,
        contentType: file.mimetype,
      }
    });
    return product;
  }

  async update(id: string, data: any, file?: Express.Multer.File) {
    const update = file 
      ? { ...data, photo: { data: file.buffer, contentType: file.mimetype } } 
      : data;
      
    return Product.findOneAndUpdate({ _id: id }, update, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string) {
    return Product.findByIdAndDelete(id);
  }
}

export default new ProductService();