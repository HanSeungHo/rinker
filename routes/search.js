var config = require('../config'),
	mysql = require('mysql');
/*
 * GET home page.
 */

exports.query = function(req, res){

	var q = req.param('q');
	var db = mysql.createConnection(config.mysql);


	db.query('USE ' + config.people_db, function(err, rows) {
		if(err){
			console.log("DB fail: ", err);
			db.end();
			return;
		}
	});

	var result = db.query("SELECT * FROM `" + config.people_table + "` WHERE `name` LIKE  '%" + q + "%'", function(err, rows) {
		
		if(err){
			console.log("DB fail: ", err);
			db.end();
			return;
		}

		res.render('search', { 
			title: 'Rinker-Result',
			query: q,
			rows: rows
		});
	});


};