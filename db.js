const { password } = require('pg/lib/defaults');

const Pool = require('pg').Pool;

const pool = new Pool({
    user : "your_user_name",
    host : "your_host",
    database : "your_database_name",
    password : "your_password",
    port : "your_port",
});


module.exports = pool;
