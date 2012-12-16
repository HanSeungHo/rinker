// Network
var client = new Array();

var mysql = require('../db/mysql'),
    CONFIG = require('../config/config'),
    Socket = require('net').Socket,
    io = require('socket.io').listen(CONFIG.ARGV.WS.PORT);

// Debug level
io.set('log level', 1);

console.log("++ Rinker: websocket server listening on port", CONFIG.ARGV.WS.PORT);

// Websocket Server
io.sockets.on('connection', function(client) {
	console.log('Socket.io client connected'); 

	client.on('get page', function(page) {
		mysql.getQuery('나', page, function(data) {
			client.emit('page', data);
		});
	});

	// // C# recive
	// client.on('query', function (data) {
	// 	console.log(data);
	// });

	// //광해 
	// client.on('actor', function(data) {
	// 	mysql.actor(data.query, function(rows) {
	// 		client.emit('result', rows);
	// 	});
	// });

	// // Client(web browser) send
	// mysql.get_employees(function(employees) {
	// 	client.emit('populate', employees);
	// });
	
	// // Cocket server to webbrowser
	// client.on('add employee', function(data) {
	// 	// create employee, when its done repopulate employees on client
	// 	mysql.add_employee(data, function(lastId) {
	// 		// repopulate employees on client
	// 		mysql.get_employees(function(employees) {
	// 			client.emit('populate', employees);
	// 		});
	// 	});
	// });
});


// // var net = require('net');
// var client = net.connect(CLIENT.PORT, CLIENT.HOST, function(){
//    client.on('data', function(data) {
//      console.log('data:', data.toString());
//    });

//    client.on('error', function(err) {
//      console.log('error:', err.message);
//    });

//    client.write('아이유가 부른 노래');
// });