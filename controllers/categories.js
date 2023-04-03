import slugify from 'slugify';
import Category from '../models/Category.js';

const categoriesController = {
  newCategory: async (req, res) => {
    try {
      res.render('admin/categories/new');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  createCategory: async (req, res) => {
    try {
      const { category } = req.body;

      if (category) {
        const result = await Category.create({
          category,
          slug: slugify(category),
        });

        if (result instanceof Category) {
          return res.redirect('/admin/categories');
        }
      }
      res.redirect('/admin/categories/new');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  getCategories: async (req, res) => {
    try {
      const result = await Category.findAll({ order: [['category', 'ASC']] });

      if (result.every((category) => category instanceof Category)) {
        res.render('admin/categories/index', { categories: result });
      } else {
        res.redirect('/admin/categories');
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  editCategory: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      if (id) {
        const result = await Category.findByPk(id);

        if (result instanceof Category) {
          return res.render('admin/categories/edit', { category: result });
        }
      }
      res.redirect('/admin/categories');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  updateCategory: async (req, res) => {
    try {
      const id = parseInt(req.body.id);
      const { category } = req.body;

      if (id && category) {
        await Category.update(
          { category, slug: slugify(category) },
          { where: { id } },
        );
      }
      res.redirect('/admin/categories');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const id = parseInt(req.body.id);

      if (id) {
        await Category.destroy({ where: { id } });
      }
      res.redirect('/admin/categories');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },
};

export default categoriesController;
