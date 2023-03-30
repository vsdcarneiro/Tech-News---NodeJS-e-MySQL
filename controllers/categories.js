import operations from "../database/categories/queries.js";

const categoriesController = {
  newCategory: async (req, res) => {
    res.render("admin/categories/new");
  },

  createCategory: async (req, res) => {
    try {
      const { category } = req.body;

      if (category) {
        await operations.createCategory(category);
        res.redirect("/admin/categories");
      } else {
        res.redirect("/admin/categories/new");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },

  getCategories: async (req, res) => {
    try {
      const result = await operations.getCategories();

      if (result) {
        res.render("admin/categories/index", { categories: result });
      } else {
        res.redirect("/admin/categories");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },

  editCategory: async (req, res) => {
    try {
      if (!isNaN(req.params.id)) {
        const id = parseInt(req.params.id);
        const result = await operations.getCategoryById(id);

        if (result) {
          res.render("admin/categories/edit", { category: result });
        } else {
          res.redirect("/admin/categories");
        }
      } else {
        return res.redirect("/admin/categories");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },

  updateCategory: async (req, res) => {
    try {
      const [id, category] = [parseInt(req.body.id), req.body.category];

      if (category) {
        await operations.updateCategory(id, category);
        res.redirect("/admin/categories");
      } else {
        res.render("admin/categories/edit", {
          category: { id, category },
        });
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const id = parseInt(req.body.id);
      await operations.deleteCategory(id);
      res.redirect("/admin/categories");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },
};

export default categoriesController;
