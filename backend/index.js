// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database'); // named export
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// ───────────────────────────────────────────────────────────────
// Middleware
app.use(cors());
app.use(express.json());

// ───────────────────────────────────────────────────────────────
// Health / diagnostics (great for quick debugging)
app.get('/', (_req, res) => res.json({ status: 'ok', service: 'student-api' }));
app.get('/ping', (_req, res) => res.send('pong'));
app.get('/dbcheck', async (_req, res, next) => {
  try {
    await sequelize.authenticate();
    const [rows] = await sequelize.query('SELECT 1 AS ok');
    res.json({ ok: true, rows });
  } catch (err) {
    next(err);
  }
});

// ───────────────────────────────────────────────────────────────
// API routes
app.use('/students', studentRoutes);

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', path: req.originalUrl });
});

// Global error handler (keeps errors formatted)
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// ───────────────────────────────────────────────────────────────
// Boot
let server;
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    server = app.listen(PORT, () =>
      console.log(`🚀 API ready at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
})();

// Graceful shutdown
const shutdown = async (signal) => {
  try {
    console.log(`\n${signal} received. Shutting down...`);
    if (server) await new Promise((r) => server.close(r));
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error('Error during shutdown:', e);
    process.exit(1);
  }
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Export for testing (optional)
module.exports = app;
