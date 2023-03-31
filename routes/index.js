import { Router } from 'express';
import News from '../models/News.js';

const router = Router();

router.get('/', async (req, res) => {
  const result = await News.findAll();

  if (result.every((news) => news instanceof News)) {
    res.render('index', { news: result });
  }
});

export default router;
