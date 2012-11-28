var mysql = require('../db/mysql');

exports.error = function(req, res){
	res.render('error', { title: 'DATABASE ERROR', error: '에러' });
}

exports.query = function(req, res){
	var query = req.param('q');
	if(query){
		mysql.getQuery(query, function(rows) {
				res.render('search', { 
					title: 'Rinker-Result',
					query: query,
					rows: rows,
					result: rows.length
				});
		});
		mysql.logQuery(query);
	}else{
		mysql.getAll(function(rows) {
				res.render('search', { 
					title: 'Rinker-Result',
					query: query,
					rows: rows,
					result: rows.length
				});
		});
	}
};

// route /sql:query
exports.sql = function(req, res){
	var use = req.param('use');
	var sql = req.param('sql');
	mysql.getSQL(use, sql, function(rows) {
			res.render('search', { 
				title: 'Rinker-Result',
				query: 'USE '+use+' '+sql,
				rows: rows,
				result: rows.length
			});
	});
};

// route /sql:query
exports.movie = function(req, res){
	var query = req.param('q');
	mysql.movie(query, function(rows) {
			res.render('search', { 
				title: 'Rinker-Result',
				query: 'USE ',
				rows: rows,
				result: 'fuck'
			});
	});
};


// socket test
exports.socket = function(req, res){
	res.render('socket', { title: 'Socket Test', error: '에러' });
};