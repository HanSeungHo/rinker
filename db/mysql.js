var CONFIG = require('../config/config'),
    mysql = require('mysql'),
    client = mysql.createConnection(CONFIG.MYSQL);

// // destroy old db
// client.query('DROP DATABASE IF EXISTS mynode_db', function(err) {
//   if (err) { throw err; }
// });

// // create database
// client.query('CREATE DATABASE mynode_db', function(err) {
//   if (err) { throw err; }
// });
// console.log('database mynode_db is created.');


// // create table
// var sql = ""+
// "create table employees("+
// " id int unsigned not null auto_increment,"+
// " name varchar(50) not null default 'unknown',"+
// " salary dec(10,2) not null default 100000.00,"+
// " primary key (id)"+
// ");";
// client.query(sql, function(err) {
//   if (err) { throw err; }
// });
// console.log('table employees is created.');

// function to create employeels
exports.add_employee = function(data, callback) {
 client.query('USE mynode_db');
 client.query("insert into employees (name, salary) values (?,?)", [data.name, data.salary], function(err, info) {
    // callback function returns last insert id
    callback(info.insertId);
    console.log('Employee '+data.name+' has salary '+data.salary); 
  });
}

// function to get list of employees
exports.get_employees = function(callback) {
  client.query('USE mynode_db');
  client.query("select * from employees", function(err, results, fields) {
    // callback function returns employees array
    callback(results);
  });
}

exports.getDB = function(calback) {
  client.query("USE " + CONFIG.MYSQL_PEOPLE_DB);
  client.query("select * nate_people", function(err, results, fields) {
    // callback function returns last insert id
    calback(results);
  });
}

exports.getQuery = function(query, calback) {
  client.query("USE " + CONFIG.MYSQL_PEOPLE_DB);
  client.query(
    "SELECT * FROM `" + CONFIG.MYSQL_PEOPLE_TABLE + "` WHERE `name` LIKE  '%" + query + "%'"
    , function(err, results, fields) {
      // callback function returns last insert id
      calback(results);
  });
}

exports.getSQL = function(use, sql, calback) {
  client.query("USE " + use);
  client.query(sql, function(err, results, fields) {
    // callback function returns last insert id
    calback(results);
  });
}