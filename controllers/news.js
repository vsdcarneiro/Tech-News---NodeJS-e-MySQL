import slugify from 'slugify'
import News from '../models/News.js'
import Category from '../models/Category.js'

const newsController = {
  newNews: async (req, res) => {
    try {
      const result = await Category.findAll()

      if (result.every((category) => category instanceof Category)) {
        res.render('admin/news/new', { categories: result })
      } else {
        res.redirect('/admin/news')
      }
    } catch (error) {
      res.status(500).send('Internal Server Error')
    }
  },

  createNews: async (req, res) => {
    try {
      const { title } = req.body
      const { description } = req.body
      const categoryId = parseInt(req.body.category)

      if (title && description && categoryId) {
        const result = await News.create({
          title,
          slug: slugify(title),
          description,
          CategoryId: categoryId,
        })

        if (result instanceof News) {
          return res.redirect('/admin/news')
        }
      }
      res.redirect('/admin/news/new')
    } catch (error) {
      res.status(500).send('Internal Server Error')
    }
  },

  getNews: async (req, res) => {
    try {
      const result = await News.findAll({ include: [{ model: Category }] })

      if (result.every((news) => news instanceof News)) {
        res.render('admin/news/index', { news: result })
      } else {
        res.redirect('/admin/news')
      }
    } catch (error) {
      res.status(500).send('Internal Server Error')
    }
  },

  deleteNews: async (req, res) => {
    try {
      if (!isNaN(req.body.id)) {
        const id = parseInt(req.body.id)

        await News.destroy({ where: { id } })
      }
      res.redirect('/admin/news')
    } catch (error) {
      res.status(500).send('Internal Server Error')
    }
  },
}

export default newsController
