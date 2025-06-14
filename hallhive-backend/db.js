require('dotenv').config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = db;
// Test the database connection
db.query('SELECT 1')
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database error:', err));

module.exports = db;