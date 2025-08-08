import { Request } from "express";
import { IProduct } from "@/modules/wallapop/models/Product.model";

export const transformProduct = (product: IProduct, req: Request) => { // <--
  const productData =
    (product as any)._doc ||
    product.toObject?.() ||
    product;

  const { photo, ...rest } = productData;

  return {
    ...rest,
    imgSrc: photo?.data
      ? `${req.protocol}://${req.get("host")}/api/images/${product._id.toString()}` // <-- ensure string
      : null,
  };
};