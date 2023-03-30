import slugify from "slugify";
import Category from "../../models/Category.js";

const operationsCategory = {
  createCategory: async (category) => {
    try {
      const result = await Category.create({
        category,
        slug: slugify(category),
      });

      if (result instanceof Category) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const result = await Category.findAll();

      if (result.every((category) => category instanceof Category)) {
        return result;
      } else {
        return undefined;
      }
    } catch (error) {
      throw error;
    }
  },

  getCategoryById: async (id) => {
    try {
      const result = await Category.findByPk(id);

      if (result instanceof Category) {
        return result;
      }
      return undefined;
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (id, category) => {
    try {
      await Category.update(
        { category, slug: slugify(category) },
        { where: { id } }
      );
    } catch (error) {
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      await Category.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  },
};

export default operationsCategory;
