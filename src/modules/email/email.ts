import express from "express";
const router = express.Router();
import {
  contactMe,
} from "./emailController";
//const { validateCreate } = require("../validators/users");

// POST
router.post("/contactMe", contactMe);

export default router;