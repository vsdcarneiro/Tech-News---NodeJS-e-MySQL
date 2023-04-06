import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

const User = sequelize.define('User', {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async (model) => {
  await model.sync({ force: false });
})(User);

export default User;
