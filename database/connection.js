import config from 'config';
import { Sequelize } from 'sequelize';

const { uri } = config.get('mysql');
const sequelize = new Sequelize(uri, { timezone: '-03:00' });

async function mysqlConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { sequelize, mysqlConnection };
