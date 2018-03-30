const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.render('index', {title: 'TutorUP'})
})

module.exports = app;
