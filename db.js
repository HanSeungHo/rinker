var config = require('./config'),
    mysql = require('mysql');
    client = mysql.createConnection(config.mysql);

var mysqlUtil = module.exports = {
    search: function(query, res) {
      client.query('USE ' + config.people_db);
      client.query(
          "SELECT * FROM `" + config.people_table + "` WHERE `name` LIKE  '%" + query + "%'"
          , function(err, rows, fields) {
            if (err) {
              res.render('error', { title: 'DATABASE ERROR', error: err });
              return; 
            } 
            res.render('search', { 
              title: 'Rinker-Result',
              query: query,
              rows: rows,
              result: rows.length
            });
          }
      );
    }, 
    sql: function(use, sql, res) {
      client.query('USE ' + use);
      client.query(
          unescape(sql.replace(/\+/g, " "))
          , function(err, rows, fields) {
            if (err) {
              res.render('error', { title: 'SQL QUERY ERROR', error: err });
              return; 
            } 
            res.render('search', { 
              title: 'Rinker-SQL-Result',
              query: 'USE '+use+' '+sql,
              rows: rows,
              result: rows.length
            });
          }
      );
    }
};
