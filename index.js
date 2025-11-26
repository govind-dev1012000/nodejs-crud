// index.js
require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

// GET all products
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products;');
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// health check
app.get('/', (req, res) => res.json({ message: 'API running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
