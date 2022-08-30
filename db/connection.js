const mysql2 = require('mysql2');

const connection = mysql2.createConnection(
    {
        host: 'localhost',
        port: 3000,
        user: 'root',
        password: '@Alonzo512',
        database: 'buisness'
    }
)
connection.connect(function(err){
    if (err){
        throw err;
    }
    console.log('Connected to MySQL2')
})

module.exports = connection;