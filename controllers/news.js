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
      res.redirect("/admin/news/new");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },
};

export default newsController;
