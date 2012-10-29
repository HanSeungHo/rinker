
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

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
app.get('/users', user.list);

var logo = '\n\n';
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
  console.log(logo,"Express server listening on port ", app.get('port'));
});
