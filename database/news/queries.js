import slugify from "slugify";
import News from "../../models/News.js";
import Category from "../../models/Category.js";

const operationsNews = {
  createNews: async (title, description, categoryId) => {
    try {
      const result = await News.create({
        title,
        slug: slugify(title),
        description,
        CategoryId: categoryId,
      });

      if (result instanceof News) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  },

  getNews: async () => {
    try {
      const result = await News.findAll({ include: [{ model: Category }] });

      if (result.every((news) => news instanceof News)) {
        return result;
      }
      return undefined;
    } catch (error) {
      throw error;
    }
  },

  getNewsById: async (id) => {
    try {
      const result = await News.findByPk(id);

      if (result instanceof News) {
        return result;
      }
      return undefined;
    } catch (error) {
      throw error;
    }
  },

  updateNews: async (id, news) => {
    try {
      await News.update({ news }, { where: { id } });
    } catch (error) {
      throw error;
    }
  },

  deleteNews: async (id) => {
    try {
      await News.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  },
};

export default operationsNews;
