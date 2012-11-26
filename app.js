/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , search = require('./routes/search')
  , graph = require('./routes/graph')
  , auth = require('./routes/auth')
  , http = require('http')
  , path = require('path')
  , db_helper = require("./db_socket.js");

var app = express();

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

// { id: 'ttest',
// name: 'ttest',
// email: 'penguns@naver.com',
// password: 'iQNy7IEYP/6zUvUW7yLZ5y7/hVyWHWeCdQWnkUoCiSA0tar8pLsy+uQXOQD+A5B74i+cAC107vFAO4VRGSmKyw==' }

var io = require('socket.io').listen(3001);

io.sockets.on('connection', function(client) {
  console.log('Client connected'); 

  // populate employees on client
  db_helper.get_employees(function(employees) {
    client.emit('populate', employees);
  });
  
  // client add new employee
  client.on('add employee', function(data) {
    // create employee, when its done repopulate employees on client
    db_helper.add_employee(data, function(lastId) {
      // repopulate employees on client
      db_helper.get_employees(function(employees) {
        client.emit('populate', employees);
      });
    });
  });
});

function loadAdmin(req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user;
    next();
  } else {
    res.redirect('/login');
  }
} 

function loadUser(req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user;
    next();
  } else {
    res.locals.user = undefined;
    next();
  }
} 

app.configure('development', function(){
  app.use(express.errorHandler());
});

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

// Graph db
app.get('/graph', loadAdmin, graph.list);
app.post('/graph', loadAdmin, graph.create);
app.get('/graph/:id', loadAdmin, graph.show);
app.post('/graph/:id', loadAdmin, graph.edit);
app.del('/graph/:id', loadAdmin, graph.del);

app.post('/graph/:id/follow', loadAdmin, graph.follow);
app.post('/graph/:id/music', loadAdmin, graph.music);
app.post('/graph/:id/unfollow', loadAdmin, graph.unfollow);

// User
app.get('/users', loadAdmin, auth.getUsers);
app.get('/users/new', loadAdmin, auth.getNew);
app.post('/users/new', loadAdmin, auth.postNew);
app.get('/user/:id', loadAdmin, auth.getId);
app.post('/user/:id', loadAdmin, auth.postId);
app.post('/dropuser', loadAdmin, auth.postDropuser);

// Error
app.get('/error', search.error);


var logo = '\n';
    logo += '=====================================================================\n\n'
    logo += '          OOOOOO,   OO~            OO                                \n'
    logo += '          OO   OOO  OO~            OO                                \n'
    logo += '          OO    OO                 OO                   ,OOO,        \n'
    logo += '          OO    OO  OO~  OOOOOOO   OO  ,O,  OOOOOO   O~OOO OOOO      \n'
    logo += '          OO   ,OO  OO~  OO   OO.  OO .O,  ,OO   OO  OO              \n'
    logo += '          OOOOOOO   OO~  OO   OO.  OO O,   OO    OO  OO              \n'
    logo += '          OO  OO.   OO~  OO   OO.  OOOO.   OOOOOOOO  OO              \n'
    logo += '          OO  .OO   OO~  OO   OO.  OO OO   OO        OO              \n'
    logo += '          OO   OO,  OO~  OO   OO.  OO  OO  OO.       OO              \n'
    logo += '          OO   .OO  OO~  OO   OO.  OO  OOO  OO  OO,  OO              \n'
    logo += '          OO    OOO OO~  OO   OO.  OO   OO   OOOO    OO              \n'
    logo += '=====================================================================\n\n'

http.createServer(app).listen(app.get('port'), function(){
  console.log(logo,"Rinker server listening on port ", app.get('port'));
});