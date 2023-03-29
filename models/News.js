import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import Category from "./Category.js";

const News = sequelize.define("News", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Cardinality: (1, 1)
News.belongsTo(Category);

(async (model) => {
  await model.sync({ force: false });
})(News);

export default News;
