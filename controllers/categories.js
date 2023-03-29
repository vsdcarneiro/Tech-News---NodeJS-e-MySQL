import { createCategory } from "../database/categories/queries.js";

const categoriesController = {
  newCategory: async (req, res) => {
    res.render("admin/categories/new.ejs");
  },

  saveCategory: async (req, res) => {
    try {
      const category = req.body.category;

      if (category) {
        const result = await createCategory(category);
        res.status(201).json(result);
      } else {
        res.redirect("/admin/categories/new");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },
};

export default categoriesController;
