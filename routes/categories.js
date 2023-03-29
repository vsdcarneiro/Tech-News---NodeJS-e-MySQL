import { Router } from "express";
import categoriesController from "../controllers/categories.js";

const router = Router();

router.get("/admin/categories/new", categoriesController.newCategory);

export default router;
