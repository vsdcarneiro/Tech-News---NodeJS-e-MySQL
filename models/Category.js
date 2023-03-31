import { DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

const Category = sequelize.define('Category', {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

;(async (model) => {
  await model.sync({ force: false })
})(Category)

export default Category
