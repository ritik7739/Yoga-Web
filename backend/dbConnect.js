const mysql = require("mysql2");
const dbConfig = require("./config/dbConfig.js");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});


connection.connect((error) => {
    if (error) throw error;
    let createCustomerTable = `create table if not exists customer(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        gender VARCHAR(255) NOT NULL,
        status VARCHAR(255) DEFAULT "reg",
        batch  VARCHAR(255) DEFAULT "-",
        reg_date DATE NOT NULL
    )`;

    connection.query(createCustomerTable, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });
    console.log("Successfully connected to the database.");
});

module.exports = connection;