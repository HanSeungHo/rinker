/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Rinker'});
};

exports.scraper = function(req, res){
	res.render('admin/scrap', { title: 'Rinker'});
};
