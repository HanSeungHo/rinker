exports.index = function(req, res){
	res.render('index', { title: 'Rinker'});
};

exports.iframe = function(req, res){
	var url = req.param('url');
	res.render('iframe', { title: 'Rinker', url: url});
};

exports.scraper = function(req, res){
	res.render('admin/scrap', { title: 'Rinker' });
};

exports.under = function(req, res){
	res.render('error', { title: '제작 중...', error: '제작 중인 기능입니다. 문의 : penguns@naver.com' });
}

