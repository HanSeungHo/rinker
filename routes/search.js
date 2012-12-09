var mysql = require('../db/mysql'),
		CONFIG = require('../config/config');
// /search
exports.query = function(req, res){
	var query = req.param('q');
	if(query){
		// // SQL LIKE fillter
		// query=unescape(query).replace('!','');
		// get Query
		mysql.getQuery(query, 0, function(rows) {
			console.log(query);
			if (rows.length) {
				res.render('search', { 
					title: 'Rinker-Result',
					query: query,
					rows: rows,
					result: rows.length
				});
			}else{
				return res.redirect('/search/help');
			}
		});
		mysql.logQuery(query);
	}else{
		mysql.getRandom(function(rows) {
				res.render('search', { 
					title: 'Rinker - 소셜 그래프 인물검색',
					query: '전체',
					rows: rows,
					result: rows.length
				});
		});
	}
};

// /search/job/:job
exports.job = function(req, res){

	var job = req.param('q');
	
	if(job){
		mysql.getJob(job, function(rows) {
				res.render('search', { 
					title: 'Rinker - 소셜 그래프 인물검색',
					query: job,
					rows: rows,
					result: rows.length
				});
		});
	}else{
		return res.redirect('/search/help');
	}
};

// /search/person/:id
exports.person = function(req, res){
	var id = req.params.id;
	mysql.getPerson(id, function(rows) {

		if (rows.length) {
			res.render('search', { 
				title: 'Rinker - [' + rows[0].name + '] 인물 검색 결과',
				query: rows[0].name,
				rows: rows,
				result: rows.length
			});
		}else{
			return res.redirect('/search/help');
		}

	});
};

// /search/movie/:id
exports.movie = function(req, res){
	return res.redirect('/under');
};

// /search/music/:id
exports.music = function(req, res){
	return res.redirect('/under');
};

// admin, /sql?use=DATABASE&sql=SQL
exports.sql = function(req, res){
	var use = req.param('use');
	var sql = req.param('sql');
	mysql.getSQL(use, sql, function(rows) {
			res.render('search', { 
				title: 'Rinker-Result',
				query: 'USE ' + use + ' ' + sql,
				rows: rows,
				result: rows.length
			});
	});
};

// /search/actor
exports.actor = function(req, res){
	var query = req.param('q');
	mysql.actor(query, function(rows) {
			res.render('search', { 
				title: 'Rinker-Result',
				query: 'USE ',
				rows: rows,
				result: 'fuck'
			});
	});
};

// admin, /socket
exports.socket = function(req, res){
	res.render('socket', { title: 'Socket Test'});
};

// search/help
exports.help = function(req, res){
	res.render('error', { title: '검색결과가 없습니다', error: '이렇게 입력해보세요. 예) 김태희 -> 태희, 레오나르도디카프리오 -> 디카프리오' });
}

// search/error
exports.error = function(req, res){
	res.render('error', { title: 'DATABASE ERROR', error: '에러' });
}

// post view
exports.view = function(req, res){
	var v = req.param('v');
	req.session.view = v;
	res.redirect('back');
};

