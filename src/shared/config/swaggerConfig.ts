import swaggerJSDoc from "swagger-jsdoc";
import path from "node:path";

// Temporarily disable docs import to avoid model conflicts
// import { productSwaggerDocs, userSwaggerDocs } from "../docs/index";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NodePop API",
      version: "1.0.0",
      description: "Documentación generada automáticamente - Modular Structure",
    },
    components: {
      schemas: {
        // Temporarily disable schema imports to avoid model conflicts
        // ...productSwaggerDocs.components.schemas,
        // ...userSwaggerDocs.components.schemas,
      },
    }
    //
    //paths: {
    //  ...productDocs.paths, // Rutas de productos
    //  ...authDocs.paths, // Rutas de autenticación
    //},
  },
  apis: [path.join(__dirname, "../routes/**/*.{js,ts}")], // adds aditional comments
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
