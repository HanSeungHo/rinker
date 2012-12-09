// Neo4j template
// Routes to CRUD users.

var User = require('../db/graph');

// GET /users
exports.list = function (req, res, next) {
	User.getAll(function (err, users) {
		if (err) return next(err);
		res.render('node', {
			title: 'Graph Test',
			users: users
		});
	});
};

// POST /users
exports.create = function (req, res, next) {
		User.create({
				name: req.body['name']
		}, function (err, user) {
				if (err) return next(err);
				res.redirect('/graph/' + user.id);
		});
};

// GET /graph/:id
exports.show = function (req, res, next) {
	User.get(req.params.id, function (err, user) {
		if (err) return next(err);
		// TODO also fetch and show followers?
		user.getFollowingAndOthers(function (err, following, others) {
			if (err) return next(err);
			res.render('rel', {
				title: 'Graph Test',
				user: user,
				following: following,
				others: others
			});
		});
	});
};

// POST /graph/:id
exports.edit = function (req, res, next) {
	User.get(req.params.id, function (err, user) {
		if (err) return next(err);
		user.name = req.body['name'];
		user.save(function (err) {
			if (err) return next(err);
			res.redirect('/graph/' + user.id);
		});
	});
};

// DELETE /graph/:id
exports.del = function (req, res, next) {
	User.get(req.params.id, function (err, user) {
		if (err) return next(err);
		user.del(function (err) {
			if (err) return next(err);
			res.redirect('/users');
		});
	});
};

// POST /graph/:id/follow
exports.follow = function (req, res, next) {
	User.get(req.params.id, function (err, user) {
		if (err) return next(err);
		User.get(req.body.user.id, function (err, other) {
			if (err) return next(err);
			user.follow(other, function (err) {
				if (err) return next(err);
				res.redirect('/graph/' + user.id);
			});
		});
	});
};

// POST /graph/:id/follow
exports.music = function (req, res, next) {
	User.get(req.params.id, function (err, user) {
		if (err) return next(err);
		User.get(req.body.user.id, function (err, other) {
			if (err) return next(err);
			user.music(other, function (err) {
				if (err) return next(err);
				res.redirect('/graph/' + user.id);
			});
		});
	});
};

// POST /graph/:id/unfollow
exports.unfollow = function (req, res, next) {
	User.get(req.params.id, function (err, user) {
		if (err) return next(err);
		User.get(req.body.user.id, function (err, other) {
			if (err) return next(err);
			user.unfollow(other, function (err) {
				if (err) return next(err);
				res.redirect('/graph/' + user.id);
			});
		});
	});
};
