var config = require('../config'),
		db = require('../db'),
		mysql = require('mysql');
/*
 * GET home page.
 */
exports.error = function(req, res){
	res.render('error', { title: 'DATABASE ERROR', error: '에러' });
}

exports.query = function(req, res){
	var q = req.param('q');
	db.search(q, res);
};


// route /sql:query
exports.sql = function(req, res){
	var use = req.param('use');
	var sql = req.param('sql');
	db.sql(use, sql, res);
};