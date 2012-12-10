var logo = '\n'
+'================================================================\n\n'
+'        OOOOOO,   OO~            OO                             \n'
+'        OO   OOO  OO~            OO                             \n'
+'        OO    OO                 OO                  ,OOO,      \n'
+'        OO    OO  OO~  OOOOOOO   OO  ,O,  OOOOOO   O~OO OOO     \n'
+'        OO   ,OO  OO~  OO   OO.  OO .O,  ,OO   OO  OO           \n'
+'        OOOOOOO   OO~  OO   OO.  OO O,   OO    OO  OO           \n'
+'        OO  OO.   OO~  OO   OO.  OOOO.   OOOOOOOO  OO           \n'
+'        OO  .OO   OO~  OO   OO.  OO OO   OO        OO           \n'
+'        OO   OO,  OO~  OO   OO.  OO  OO  OO.       OO           \n'
+'        OO   .OO  OO~  OO   OO.  OO  OOO  OO  OO,  OO           \n'
+'        OO    OOO OO~  OO   OO.  OO   OO   OOOO    OO           \n\n'
+'----------------------------------------------------------------\n'
+'          AMI TEAM PROJECT : ENTERTAINMENT SEARCH SERVICE       \n'
+'================================================================\n\n';

// Modules require
var express = require('express')
	, routes = require('./routes')
	, search = require('./routes/search')
	, graph = require('./routes/graph')
	, auth = require('./routes/auth')
	, http = require('http')
	, flash = require('connect-flash')
	, path = require('path');

var app = express();

// Express configure
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());  
	app.use(express.cookieParser('Rinker session'));
	app.use(flash());
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

/* Session example
{ id: 'test',
	name: 'test',
	email: 'penguns@naver.com',
	password: 'iQNy7IEYP/6zUvUW7yLZ5y7/hVyWHWeCdQWnkUoCiSA0tar8pLsy+uQXOQD+A5B74i+cAC107vFAO4VRGSmKyw=='
} */

app.locals = {
	user : undefined,
	view : undefined
}

// Guest auth
function loadUser(req, res, next) {
	res.locals.view = req.session.view;
	if (req.session.user) {
		res.locals.user = req.session.user;
		next();
	} else {
		res.locals.user = undefined;
		next();
	}
};

// Admin auth
function loadAdmin(req, res, next) {
	res.locals.view = req.session.view;
	if (req.session.user) {
		res.locals.user = req.session.user;
		next();
	} else {
		res.locals.user = undefined;
		res.redirect('/login');
	}
};

app.get('/actor', loadUser, search.actor);

// Page
//app.get('/', loadUser, routes.index);
app.get('/', loadUser, search.index);
app.get('/link', loadUser, routes.iframe);
app.get('/under', loadUser, routes.under);
app.get('/scraper', loadAdmin, routes.scraper);

// Search
app.post('/view', search.view);
app.get('/view', search.view);
app.get('/search', loadUser, search.query);
app.get('/search/person/:id', loadUser, search.person);
app.get('/search/movie/:id', loadUser, search.movie);
app.get('/search/music/:id', loadUser, search.music);

app.get('/search/job', loadUser, search.job);
app.get('/search/actor', loadUser, search.actor);
app.get('/socket', loadUser, search.socket);
app.get('/sql', loadUser, search.sql);
app.get('/search/help', loadUser, search.help);
app.get('/search/error', loadUser, search.error);

// Login & Logout
app.get('/login', loadUser, auth.login);
app.post('/login', loadUser, auth.postLogin);
app.get('/logout', loadUser, auth.logout);

// User
app.get('/users', loadAdmin, auth.getUsers);
app.get('/users/new', loadAdmin, auth.getNew);
app.post('/users/new', auth.postNew);
app.get('/user/:id', loadAdmin, auth.getId);
app.post('/user/:id', loadAdmin, auth.postId);
app.post('/dropuser', loadAdmin, auth.postDropuser);

// Graph dbms
app.get('/graph', loadAdmin, graph.list);
app.post('/graph', loadAdmin, graph.create);
app.get('/graph/:id', loadAdmin, graph.show);
app.post('/graph/:id', loadAdmin, graph.edit);
app.del('/graph/:id', loadAdmin, graph.del);

app.post('/graph/:id/follow', loadAdmin, graph.follow);
app.post('/graph/:id/music', loadAdmin, graph.music);
app.post('/graph/:id/unfollow', loadAdmin, graph.unfollow);

// Create server
http.createServer(app).listen(app.get('port'), function(){
	console.log(logo,"Rinker server listening on port", app.get('port'));
});

// Websocket, Socket server
var net = require('./network');