import express from 'express';
import session from 'express-session';
import { mysqlConnection } from './database/connection.js';
import index from './routes/index.js';
import categories from './routes/categories.js';
import news from './routes/news.js';
import users from './routes/users.js';

(async () => {
  try {
    console.log('Starting the application');

    // Connect to database
    await mysqlConnection();

    const app = express();
    const port = process.env.PORT || 3000;

    // Set view engine
    app.set('view engine', 'ejs');

    // Configure session
    app.use(
      session({
        secret: 'technews',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 3600000 },
      }),
    );

    // Set static file directory
    app.use(express.static('public'));

    // Set middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Use routes
    app.use(index);
    app.use('/', categories);
    app.use('/', news);
    app.use('/', users);

    app.listen(port, () => console.log('Server is running on port', port));
  } catch (error) {
    console.log(error);
  }
})();
