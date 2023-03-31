import express from 'express'
import { mysqlConnection } from './database/connection.js'
import categories from './routes/categories.js'
import news from './routes/news.js'

;(async () => {
  try {
    console.log('Starting the application')

    // Connect to database
    await mysqlConnection()

    const app = express()
    const port = process.env.PORT || 3000

    // Set view engine
    app.set('view engine', 'ejs')

    // Set static file directory
    app.use(express.static('public'))

    // Set middlewares
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    app.use('/', categories)
    app.use('/', news)

    // Set routes
    app.get('/', (req, res) => {
      res.render('index')
    })

    app.listen(port, () => console.log('Server is running on port', port))
  } catch (error) {
    console.log(error)
  }
})()
