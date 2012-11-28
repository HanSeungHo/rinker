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

// Guest auth
function loadUser(req, res, next) {
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
	if (req.session.user) {
		res.locals.user = req.session.user;
		next();
	} else {
		res.redirect('/login');
	}
};

app.get('/movie', loadUser, search.movie);
// Index
app.get('/', loadUser, routes.index);

// Search
app.get('/search', loadUser, search.query);
app.get('/socket', loadUser, search.socket);
app.get('/sql', loadUser, search.sql);

// Login & Logout
app.get('/login', loadUser, auth.login);
app.post('/login', loadUser, auth.postLogin);
app.get('/logout', loadUser, auth.logout);

// User
app.get('/users', loadAdmin, auth.getUsers);
app.get('/users/new', loadAdmin, auth.getNew);
app.post('/users/new', loadAdmin, auth.postNew);
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

// Error page
app.get('/error', loadUser, search.error);

// Create server
http.createServer(app).listen(app.get('port'), function(){
	console.log(logo,"Rinker server listening on port", app.get('port'));
});

// Websocket, Socket server
var net = require('./network');