var config = require('../config'),
	mysql = require('mysql');
/*
 * GET home page.
 */
exports.error = function(req, res){
	res.render('error', { title: 'DATABASE ERROR', error: '에러' });
}

exports.query = function(req, res){

	var q = req.param('q');
	var client = mysql.createConnection(config.mysql);

	if(q){
		sql="SELECT * FROM `" + config.people_table + "` WHERE `name` LIKE  '%" + q + "%'";
	}else{
		q = '전체'
		sql="SELECT * FROM " + config.people_table;
	}

	client.query('USE ' + config.people_db, function(err, rows) {
		if(err){
			console.log("DB fail: ", err);
			client.end();

			res.render('error', { title: 'DATABASE ERROR', error: err });
			return;
		}
	});

	var result = client.query(sql, function(err, rows) {
		
		if(err){
			console.log("DB fail: ", err);
			client.end();

			res.render('error', { title: 'DATABASE ERROR', error: err });
			return;
		}

		res.render('search', { 
			title: 'Rinker-Result',
			query: q,
			rows: rows,
			result: rows.length
		});
	});


};


// route /sql:query
exports.sql = function(req, res){

	var client = mysql.createConnection(config.mysql);
	var use = req.param('use');
	var sql = req.param('sql');

	console.log("DB:", use);


	client.query('USE ' + use, function(err, rows) {
		if(err){
			console.log("DB fail: ", err);
			client.end();

			res.render('error', { title: 'DATABASE ERROR', error: err });
			return;
		}
	});



	unescape(sql.replace(/\+/g, " "));

	console.log(sql);

	client.query(sql, function(err, rows) {

		if(err){
			console.log("DB fail: ", err);
			result = err;
			client.end();

			res.render('error', { title: 'SQL QUERY ERROR', error: err });
			return;
		}

		res.render('search', { 
			title: 'Rinker-SQL-Result',
			query: sql,
			rows: rows,
			result: rows.length
		});
	});

};