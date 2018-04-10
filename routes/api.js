const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection(process.env.JAWSDB_URL);

/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */
// const config = require('../config_default');
// var dbOptions = {
// 	host:	  config.database.host,
// 	user: 	  config.database.user,
// 	password: config.database.password,
// 	port: 	  config.database.port,
// 	database: config.database.db
// }

connection.connect();

app.get('/', (req, res, next) => {
    connection.query('SELECT * FROM tutors ORDER BY id DESC', (err, rows, fields) => {
        if (err) {
            res.send(JSON.stringify({"status": 500, "error": error, "response": null }));
        }
        else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));    
        }
    });
})


module.exports = app;
