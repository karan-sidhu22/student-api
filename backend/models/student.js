const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Student = sequelize.define('Student', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true, validate: { isEmail: true } },
  age: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 120 } }
}, {
  tableName: 'students',
  timestamps: true
});

module.exports = Student;
