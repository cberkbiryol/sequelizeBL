var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "",
        database: "bucketList_db"
    })
}

connection.connect();

//Export connection for ORM 
module.exports = connection;