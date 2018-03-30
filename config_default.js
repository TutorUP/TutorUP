// Holds config for MYSQL
const config = {
    database: {
        host:      'localhost',     // database host
        user:       '<your db user>',         // your database username
        password: '<your db password>',         // your database password
        port:       3306,         // default MySQL port -maybe change port depending on where MySQL is running
        db:       'tutordb'         // your database name
    },
    server: {
        host: '127.0.0.1',
        port: '3000'
    }
}

module.exports = config
