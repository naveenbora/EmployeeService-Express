// "SERVER = 127.0.0.1; PORT = 3306; DATABASE = oncalltracking; USER Id = root; PASSWORD = Bora@025";
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    
    user: 'root',
    password: 'Bora@025',
    database: 'octs'
  })
  module.exports=connection;
  