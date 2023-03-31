import operationsCategory from "../database/categories/queries.js";
import operationsNews from "../database/news/queries.js";

const newsController = {
  newNews: async (req, res) => {
    try {
      const result = await operationsCategory.getCategories();

      if (result) {
        res.render("admin/news/new", { categories: result });
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },

  createNews: async (req, res) => {
    try {
      const { title } = req.body;
      const { description } = req.body;
      const categoryId = parseInt(req.body.category);

      await operationsNews.createNews(title, description, categoryId);
      res.redirect("/admin/news");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },

  getNews: async (req, res) => {
    try {
      const result = await operationsNews.getNews();

      if (result) {
        res.render("admin/news/index", { news: result });
      } else {
        res.redirect("/admin/news");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },

  editNews: async (req, res) => {
    try {
    } catch (error) {}
  },

  updateNews: async (req, res) => {
    try {
    } catch (error) {}
  },

  deleteNews: async (req, res) => {
    try {
      const id = parseInt(req.body.id);

      await operationsNews.deleteNews(id);
      res.redirect("/admin/news");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },
};

export default newsController;
