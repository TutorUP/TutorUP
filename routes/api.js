const express = require('express');
const app = express();
const mysql = require('mysql');

//Enable all CORS Requests
const cors = require('cors');
app.use(cors());

const connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();


app.route('/api/tutors/:name').get((req, res) => {
    const requestedTutorName = req.params['name'];
    res.send({ name: requestedTutorName });
});

app.route('/api/tutors/:name').put((req, res) => {
    res.send(200, req.body);
});

// REST API Operation
app.get('/', (req, res, next) => {
    connection.query('SELECT * FROM tutors ORDER BY id DESC', (error, results, fields) => {
        if (error) {
            res.send(JSON.stringify({"status": 500, "error": error, "response": null }));
        }
        else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        }
    });
})

app.post('/', (req, res) => {
    var params = req.body;
    connection.query('INSERT INTO tutors SET ?', params, (error, results, fields) => {
        if (error) { res.send(JSON.stringify({"status": 500, "error": error, "response": null })); }
        res.send(JSON.stringify({"status": 200, "error":null, "response": results }))
    })
})

app.put('/', (req, res) => {
    connection.query('UPDATE `tutor` SET `name`=?, `subject`=?')
    if (error) throw error;
    res.send(JSON.stringify({"status": 20, "error":null, "response": reuslts }))
})


module.exports = app;
