import { Router } from 'express';
import indexController from '../controllers/index.js';

const router = Router();

router.get('/', indexController.getNews);
router.get('/:slug', indexController.getNewsBySlug);
router.get('/categories/:slug', indexController.getNewsByCategory);
router.get('/page/:num', indexController.getNewsByPage);

export default router;
