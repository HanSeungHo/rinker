var mysql = require('mysql');

// Check install
client.query('DROP DATABASE IF EXISTS mynode_db', function(err) {
  if (err) { throw err; }
});

// create database
client.query('CREATE DATABASE mynode_db', function(err) {
  if (err) { throw err; }
});
console.log('++ Database mynode_db is created.');

// create table
var sql = ""+
"create table employees("+
" id int unsigned not null auto_increment,"+
" name varchar(50) not null default 'unknown',"+
" salary dec(10,2) not null default 100000.00,"+
" primary key (id)"+
");";

client.query(sql, function(err) {
  if (err) { throw err; }
});

console.log('++ Table employees is created.');

console.log('== INSTALL SUCCESS');