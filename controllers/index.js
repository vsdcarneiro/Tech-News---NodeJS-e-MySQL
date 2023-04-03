import News from '../models/News.js';
import Category from '../models/Category.js';

const indexController = {
  getNews: async (req, res) => {
    try {
      const resultNews = await News.findAll({
        order: [['id', 'DESC']],
        limit: 4,
      });
      const resultCategory = await Category.findAll();

      if (
        resultNews.every((news) => news instanceof News) &&
        resultCategory.every((category) => category instanceof Category)
      ) {
        res.render('index', { news: resultNews, categories: resultCategory });
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  getNewsBySlug: async (req, res) => {
    try {
      const { slug } = req.params;
      const resultNews = await News.findOne({ where: { slug } });
      const resultCategory = await Category.findAll();

      if (
        resultNews instanceof News &&
        resultCategory.every((category) => category instanceof Category)
      ) {
        return res.render('news', {
          news: resultNews,
          categories: resultCategory,
        });
      }
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  getNewsByCategory: async (req, res) => {
    try {
      const { slug } = req.params;
      const resultNews = await News.findAll({
        include: [{ model: Category, where: { slug } }],
      });
      const resultCategory = await Category.findAll();

      if (
        resultNews.every((news) => news instanceof News) &&
        resultCategory.every((category) => category instanceof Category)
      ) {
        return res.render('index', {
          news: resultNews,
          categories: resultCategory,
        });
      }
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  getNewsByPage: async (req, res) => {
    try {
      const page = parseInt(req.params.num);
      const itemsPage = 4;
      const offset = page === 1 ? 0 : page * itemsPage - itemsPage;
      let nextPage;

      const resultNews = await News.findAndCountAll({
        order: [['id', 'DESC']],
        limit: itemsPage,
        offset,
      });

      if (resultNews.count <= offset + 4) {
        nextPage = false;
      } else {
        nextPage = true;
      }

      const resultCategory = await Category.findAll();

      res.render('page', {
        page,
        nextPage,
        news: resultNews.rows,
        categories: resultCategory,
      });
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },
};

export default indexController;
