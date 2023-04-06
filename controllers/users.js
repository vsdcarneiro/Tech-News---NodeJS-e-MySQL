import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const usersController = {
  newUser: async (req, res) => {
    try {
      return res.render('admin/users/new');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  createUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (email && password) {
        const user = await User.findOne({ where: { user: email } });

        if (!user) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);

          const result = await User.create({ user: email, password: hash });

          if (result instanceof User) {
            return res.redirect('/');
          }
        }
        return res.redirect('/admin/users/new');
      }
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  getUsers: async (req, res) => {
    try {
      const result = await User.findAll({ order: [['user', 'ASC']] });

      if (result.every((user) => user instanceof User)) {
        return res.render('admin/users/index', { users: result });
      }
      res.redirect('/admin/users');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  loginUser: async (req, res) => {
    try {
      res.render('admin/users/login');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  authenticateUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (email && password) {
        const user = await User.findOne({ where: { user: email } });

        if (user) {
          const correctPassword = bcrypt.compareSync(password, user.password);

          if (correctPassword) {
            req.session.user = {
              id: user.id,
              email: user.user,
            };
            return res.redirect('/admin/news');
          }
        }
      }
      res.redirect('/users/login');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },

  logoutUser: async (req, res) => {
    try {
      req.session.user = undefined;
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  },
};

export default usersController;
