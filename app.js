const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const port = process.env.PORT || 3000;

//Static folder to access public resources (img, style)
app.use(express.static(path.join(__dirname, 'public')));

//Enable all CORS Requests
const cors = require('cors');
app.use(cors());


/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */
// const config = require('./config_default');
// const dbOptions = {
//         host: config.database.host,
//         user: config.database.user,
//         password: config.database.password,
//         database: config.database.db
// }

connection = mysql.createConnection(process.env.JAWSDB_URL);


connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// Set up EJS template engine for now
app.set('view engine', 'ejs');

/************************************
            MIDDLEWARE
*************************************/
// app.use(express.static(__dirname + 'public')); //Serves resources from public folder
// app.use(express.static(dir));
/**
* Express Validator Middleware for Form Validation
*/
var expressValidator = require('express-validator')
app.use(expressValidator())

/**
 * bodyParser.urlencoded() parses the text as URL encoded data
 * (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body.
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

/**
 * This module shows flash messages
 * generally used to show success or error messages
 *
 * Flash messages are stored in session
 * So, we also have to install and use
 * cookie-parser & session modules
 */

app.use(cookieParser('keyboard cat'));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));
app.use(flash());

/************************************
            APP ROUTES
*************************************/
const index = require('./routes/index');
const tutors = require('./routes/tutors');
const api = require('./routes/api');

app.use('/', index);
app.use('/tutors', tutors);
app.use('/api/v1/tutors', api);


app.listen(port, () => {
    console.log('Server now running');
})
