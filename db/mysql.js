var CONFIG = require('../config/config'),
    mysql = require('mysql'),
    client = mysql.createConnection(CONFIG.MYSQL.CLIENT);

// test websocket
exports.add_employee = function(data, callback) {
 client.query('USE mynode_db');
 client.query("insert into employees (name, salary) values (?,?)", [data.name, data.salary], function(err, info) {
    callback(info.insertId);
    console.log('+ QUERY LOG : '+data.name+', '+data.salary); 
  });
}

exports.logQuery = function(data) {
 client.query('USE '+ CONFIG.MYSQL.QUERY.DB);
 client.query("INSERT INTO " + CONFIG.MYSQL.QUERY.TABLE + " (query) VALUES (?)", [data], function(err, info) {
    console.log('+ LOG search query : ', data); 
  });
}

// function to get list of employees
exports.get_employees = function(callback) {
  client.query('USE mynode_db');
  client.query("select * from employees", function(err, results, fields) {
    callback(results);
  });
}

exports.getDB = function(calback) {
  client.query("USE " + CONFIG.MYSQL.PEOPLE.DB);
  client.query("SELECT * nate_people", function(err, results, fields) {
    calback(results);
  });
}

exports.actor= function(query, calback) {
  client.query("USE ent");
  var sql = [
    "SELECT actor.actor_id",
    "FROM actor INNER JOIN appearance ON appearance.actor_id = actor.actor_id",
    "WHERE appearance.movie_id = (SELECT movie_id FROM movie WHERE movie.name LIKE '%QUERY%')"
  ].join('\n')
   .replace('QUERY', query);
  
  client.query ( sql, function(err, res, fil){ 
    client.query("SELECT * FROM movie INNER JOIN appearance ON movie.movie_id = appearance.movie_id WHERE actor_id = "+res[0].actor_id, function(err, res, fil) {
      console.log(fil);
    })
  });
}

// Search query
exports.getQuery = function(query, calback) {
  client.query("USE " + CONFIG.MYSQL.PERSON.DB);
  client.query(
    "SELECT * FROM `" + CONFIG.MYSQL.PERSON.TABLE + "` WHERE `name` LIKE  '%" + query + "%' LIMIT 0, " + CONFIG.MYSQL.PERSON.LIMIT 
    , function(err, results, fields) {
      calback(results);
  });
}

// Search query
exports.getAll = function(calback) {
  client.query("USE " + CONFIG.MYSQL.PERSON.DB);
  client.query(
    "SELECT * FROM `" + CONFIG.MYSQL.PERSON.TABLE + "` WHERE `name` LIMIT 0, " + CONFIG.MYSQL.PERSON.LIMIT 
    , function(err, results, fields) {
      calback(results);
  });
}

// SQL
exports.getSQL = function(use, sql, calback) {
  client.query("USE " + use);
  client.query(sql, function(err, results, fields) {
    calback(results);
  });
}