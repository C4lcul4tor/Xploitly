// backend/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'C@)r4E2.)6Gue2gR',
  database: 'xploitly'
});

// Use promise wrapper
const db = connection.promise();

db.connect()
  .then(() => {
    console.log('✅ Connected to MariaDB');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MariaDB:', err);
  });

module.exports = db;
