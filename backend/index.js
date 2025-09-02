// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database'); // << destructure named export
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ status: 'ok', service: 'student-api' }));
app.use('/students', studentRoutes);

(async () => {
  try {
    await sequelize.authenticate();      // << will exist now
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
})();
