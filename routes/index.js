import { Router } from 'express';
import indexController from '../controllers/index.js';

const router = Router();

router.get('/', indexController.getNews);
router.get('/page/:num', indexController.getNewsByPage);
router.get('/:slug', indexController.getNewsBySlug);
router.get('/categories/:slug', indexController.getNewsByCategory);
router.get('/categories/:slug/page/:num', indexController.getNewsByCategory);

export default router;
