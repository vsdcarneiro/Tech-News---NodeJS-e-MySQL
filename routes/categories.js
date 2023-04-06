import { Router } from 'express';
import categoriesController from '../controllers/categories.js';
import { adminAuthenticate } from '../middlewares/adminAuth.js';

const router = Router();

router.get(
  '/admin/categories/new',
  adminAuthenticate,
  categoriesController.newCategory,
);
router.post('/categories/create', categoriesController.createCategory);
router.get(
  '/admin/categories',
  adminAuthenticate,
  categoriesController.getCategories,
);
router.get(
  '/admin/categories/edit/:id',
  adminAuthenticate,
  categoriesController.editCategory,
);
router.post('/categories/update', categoriesController.updateCategory);
router.post('/categories/delete', categoriesController.deleteCategory);

export default router;
