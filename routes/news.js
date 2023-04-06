import { Router } from 'express';
import newsController from '../controllers/news.js';
import { adminAuthenticate } from '../middlewares/adminAuth.js';

const router = Router();

router.get('/admin/news/new', adminAuthenticate, newsController.newNews);
router.post('/news/create', newsController.createNews);
router.get('/admin/news', adminAuthenticate, newsController.getNews);
router.get('/admin/news/edit/:id', adminAuthenticate, newsController.editNews);
router.post('/news/update', newsController.updateNews);
router.post('/news/delete', newsController.deleteNews);

export default router;
