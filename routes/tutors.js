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

/**
    READ LIST OF TUTORS
*/
app.get('/', (req, res, next) => {
    connection.query('SELECT * FROM tutors ORDER BY id DESC', (err, rows, fields) => {
        if (err) {
            req.flash('error', err);
            res.render('tutor/list', {
                title: 'Tutor List',
                data: ''
            })
        }
        else {
            res.render('tutor/list', {
                title: 'View Tutors',
                data: rows
            })}
    })
})

/**
    SHOW ADD TUTOR FORM
*/
app.get('/add', (req, res, next) => {
    res.render('tutor/add', {
        title: 'Add New Tutor',
        name: '',
        subject: '',
        email: ''
    })
})

/**
    CREATE NEW TUTOR POST ACTION
*/
app.post('/add', (req, res, next) => {
    req.assert('name', 'Name is required').notEmpty()
    req.assert('subject', 'Subject is required').notEmpty()
    req.assert('email', 'A valid email is required').isEmail()

    const errors = req.validationErrors()
    if(!errors) {
        const tutor = {
            name: req.sanitize('name').escape().trim(),
            subject: req.sanitize('subject').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }

        connection.query('INSERT INTO tutors SET ?', tutor, (err, result) => {
            if(err) {
                req.flash('error', err)

                res.render('tutor/add', {
                    title: 'Add New Tutor',
                    name: tutor.name,
                    subject: tutor.subject,
                    email: tutor.email
                })
            } else {
                req.flash('success', 'Data added successfully')
                res.render('tutor/add', {
                    title: 'Add New Tutor',
                    name: '',
                    subject: '',
                    email: ''
                })
            }
        })
    }
    else {
        const error_msg = ''
        errors.forEach((error) => {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        res.render('tutor/add', {
            title: 'Add New Tutor',
            name: req.body.name,
            subject: req.body.subject,
            email: req.body.email
        })

    }
})

/**
    SHOW EDIT TUTOR FORM
*/
app.get('/edit/(:id)', (req, res, next) => {
    connection.query('SELECT * FROM tutors WHERE id = ' + req.params.id, (err, rows, fields) => {
        //if tutor not found
    if (rows.length <= 0) {
        req.flash('error', 'Tutor not found with id = ' + req.params.id)
        res.redirect('/tutors')
    }
    else {
        res.render('tutor/edit', {
            title: 'Edit Tutor',
            id: rows[0].id,
            name: rows[0].name,
            subject: rows[0].subject,
            email: rows[0].email
        })
    }

    })
})

/**
    UPDATE TUTOR POST ACTION
*/
app.put('/edit/(:id)', (req, res, next) => {
    req.assert('name', 'Name is required').notEmpty()
    req.assert('subject', 'Subject is required').notEmpty()
    req.assert('email', 'A valid email is required').isEmail()

    const errors = req.validationErrors()

    if (!errors) {
        const tutor = {
            name: req.sanitize('name').escape().trim(),
            subject: req.sanitize('subject').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }

        connection.query('UPDATE tutors SET ? WHERE id = ' + req.params.id, tutor, (err, result) => {
            if (err) {
                req.flash('error', err)
                res.render('tutor/edit', {
                    title: 'Edit Tutor',
                    id: req.params.id,
                    name: req.body.name,
                    subject: req.body.subject,
                    email: req.body.email
                })
            }
            else {
                req.flash('success', 'Data updated successfully')
                res.render('tutor/edit', {
                    title: 'Edit Tutor',
                    id: req.params.id,
                    name: req.body.name,
                    subject: req.body.subject,
                    email: req.body.email
                })
            }
        })
    }
    else {
        const error_msg = ''
        errors.forEach((error) => {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        res.render('tutor/edit', {
            title: 'Edit Tutor',
            id: req.params.id,
            name: req.body.name,
            subject: req.body.subject,
            email: req.body.email
        })
    }
})

/**
    DELETE TUTOR ACTION
*/
app.delete('/delete/(:id)', (req, res, next) => {
    const tutor = { id: req.params.id }

    connection.query('DELETE FROM tutors WHERE id = ' + req.params.id, tutor, (err, result) => {
        if (err) {
            req.flash('error', err)
            res.redirect('/tutors')
        }
        else {
            req.flash('success', 'Tutor successfully deleted. id = ' + req.params.id)
            res.redirect('/tutors')
        }

    })
})


module.exports = app;
