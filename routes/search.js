var config = require('../config'),
	mysql = require('mysql');
/*
 * GET home page.
 */

exports.query = function(req, res){

	var q = req.param('q');
	var db = mysql.createConnection(config.mysql);


	db.query('USE repository', function(err, rows) {
		if(err){
			console.log("DB fail: ", err);
			db.end();
			return;
		}
	});

	var result = db.query("SELECT * FROM `nate_people` WHERE `name` LIKE  '%"+ q +"%'", function(err, rows) {
		
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