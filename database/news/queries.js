import slugify from "slugify";
import News from "../../models/News.js";

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
};

export default operationsNews;
