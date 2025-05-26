/*
  INITIALISE DB QUERY :

    CREATE TABLE schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    );
*/

const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  ssl: process.env.MYSQL_SSL === "true"
    ? { ca: fs.readFileSync(path.join(__dirname, "ca.pem")) }
    : false,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: To test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL DB");
    connection.release(); // release after test
  }
});

module.exports = pool;
