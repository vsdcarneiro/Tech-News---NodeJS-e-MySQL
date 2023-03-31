import { Router } from 'express';
import newsController from '../controllers/news.js';

const router = Router();

router.get('/admin/news/new', newsController.newNews);
router.post('/news/create', newsController.createNews);
router.get('/admin/news', newsController.getNews);
router.post('/news/delete', newsController.deleteNews);

export default router;
