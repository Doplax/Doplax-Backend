// Import middlewares and modules
import { Request, Response, NextFunction, Router } from "express";
import { authMiddleware } from "@shared/index";

const router = Router();

// Import routes and controllers from modules
import { authRoutes } from "@modules/auth";
import { emailRoutes } from "@modules/email";
import { productRoutes } from "@modules/products";
import { imagesRoutes } from "@modules/images";
import { tracksRoutes } from "@modules/tracks";
import swaggerRoutes from "./api/swaggerDocs";
import changeLocale from "./web/changeLocale";

// VIEW ROUTES
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  //res.render("index");
  res.redirect("/api/swaggerDocs/swagger-ui");
});

router.use("/change-locale", changeLocale);

// API ROUTES
// - Unprotected routes
router.use("/api/auth", authRoutes);
router.use("/api/email", emailRoutes);
router.use("/api/images", imagesRoutes);
router.use("/api/swaggerDocs", swaggerRoutes);
router.use("/api/tracks", tracksRoutes);

// - Protected routes
router.use("/api/products", authMiddleware, productRoutes);

export { router as indexRouter };
