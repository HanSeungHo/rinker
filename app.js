/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , search = require('./routes/search')
  , user = require('./routes/user')
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
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/search', search.query);
app.get('/socket', search.socket);
app.get('/sql', search.sql);
app.get('/error', search.error);

//graph db
app.get('/users', user.list);
app.post('/users', user.create);
app.get('/users/:id', user.show);
app.post('/users/:id', user.edit);
app.del('/users/:id', user.del);

app.post('/users/:id/follow', user.follow);
app.post('/users/:id/unfollow', user.unfollow);


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