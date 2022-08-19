const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,

});

async function getConnection() {
    const connection = await pool.getConnection()
    .catch(error => {
        throw error;
    });
    
    console.log('Database connected succesfully.')
    connection.release();
}

getConnection();

module.exports = pool;
