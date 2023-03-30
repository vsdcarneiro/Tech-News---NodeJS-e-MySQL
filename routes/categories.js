import { Router } from "express";
import categoriesController from "../controllers/categories.js";

const router = Router();

router.get("/admin/categories/new", categoriesController.newCategory);
router.post("/categories/create", categoriesController.createCategory);
router.get("/admin/categories", categoriesController.getCategories);
router.get("/admin/categories/edit/:id", categoriesController.editCategory);
router.post("/categories/update", categoriesController.updateCategory);
router.post("/categories/delete", categoriesController.deleteCategory);

export default router;
