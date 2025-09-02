// backend/config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const {
  DB_HOST = 'db',
  DB_PORT = 3306,
  DB_USER = 'appuser',
  DB_PASSWORD = 'apppass',
  DB_NAME = 'studentdb',
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
});

module.exports = { sequelize }; // << named export
