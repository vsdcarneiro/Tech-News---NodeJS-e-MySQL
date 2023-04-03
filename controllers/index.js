import News from '../models/News.js';
import Category from '../models/Category.js';

const indexController = {
  getNews: async (req, res) => {
    try {
      const resultNews = await News.findAndCountAll({
        order: [['id', 'DESC']],
        limit: 4,
      });
      const resultCategory = await Category.findAll();
      const nextPage = resultNews.count > 4 ? true : false;

      if (
        resultNews.rows.every((news) => news instanceof News) &&
        resultCategory.every((category) => category instanceof Category)
      ) {
        res.render('index', {
          filterCategory: false,
          nextPage,
          news: resultNews.rows,
          categories: resultCategory,
        });
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  getNewsBySlug: async (req, res) => {
    try {
      const { slug } = req.params;

      if (slug) {
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
      }
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  getNewsByPage: async (req, res) => {
    try {
      const page = parseInt(req.params.num);

      if (page) {
        const offset = page === 1 ? 0 : page * 4 - 4;

        const resultNews = await News.findAndCountAll({
          order: [['id', 'DESC']],
          limit: 4,
          offset,
        });
        const resultCategory = await Category.findAll();
        const nextPage = resultNews.count > offset + 4 ? true : false;

        return res.render('page', {
          filterCategory: false,
          nextPage,
          page,
          news: resultNews.rows,
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
      const page = parseInt(req.params.num) || 1;
      const itemsPage = 4;
      const offset = page === 1 ? 0 : page * itemsPage - itemsPage;

      if (slug) {
        const resultNews = await News.findAndCountAll({
          order: [['id', 'DESC']],
          limit: itemsPage,
          offset,
          include: [{ model: Category, where: { slug } }],
        });
        const resultCategory = await Category.findAll();
        const nextPage = resultNews.count > offset + 4 ? true : false;

        if (
          resultNews.rows.every((news) => news instanceof News) &&
          resultCategory.every((category) => category instanceof Category)
        ) {
          if (page === 1) {
            return res.render('index', {
              filterCategory: slug,
              nextPage,
              page,
              news: resultNews.rows,
              categories: resultCategory,
            });
          }

          return res.render('page', {
            filterCategory: slug,
            nextPage,
            page,
            news: resultNews.rows,
            categories: resultCategory,
          });
        }
      }
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },
};

export default indexController;
