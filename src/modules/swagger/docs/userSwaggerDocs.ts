import User from "@/modules/auth/models/User.model";
import { generateSwaggerSchema } from "@/shared/utils/swaggerUtils";

const userSwaggerSchema = generateSwaggerSchema(User.schema);

const userSwaggerDocs = {
  components: {
    schemas: {
      User: userSwaggerSchema,
    },
  },
};

export {userSwaggerDocs};
