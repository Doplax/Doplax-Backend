import Product from "@/modules/wallapop/models/Product.model";
import { generateSwaggerSchema } from "@/shared/utils/swaggerUtils";

const productSwaggerSchema = generateSwaggerSchema(Product.schema);

const productSwaggerDocs = {
  components: {
    schemas: {
      Product: productSwaggerSchema,
    },
  },
};

export {productSwaggerDocs};
