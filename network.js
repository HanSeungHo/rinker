// Network
var client = new Array();

var //net = require('net'),
    Socket = require('net').Socket,
    io = require('socket.io').listen(3001);

var SERVER = {
	//192.168.11.29
  HOST : '127.0.0.1',
  PORT : 3100
}
var CLIENT = {
  HOST : '203.247.161.55',
  PORT : 3100
}

var mysql = require("./db/mysql");


// var ioc = require('socket.io-client');
// var serverUrl = 'http://localhost:3002/ns';

// var conn = ioc.connect(serverUrl);

// var p1 = 'test';
// conn.emit('call', p1, function(resp, data) {
//     console.log('server sent resp code ' + resp);
// });

// Websocket Server
io.sockets.on('connection', function(client) {
	console.log('Socket.io client connected'); 

	// C# recive
	client.on('query', function (data) {
		console.log(data);
	});

	//광해 
	client.on('actor', function(data) {
		mysql.actor(data.query, function(rows) {
			client.emit('result', rows);
		});
	});

	// Client(web browser) send
	mysql.get_employees(function(employees) {
		client.emit('populate', employees);
	});
	
	// Cocket server to webbrowser
	client.on('add employee', function(data) {
		// create employee, when its done repopulate employees on client
		mysql.add_employee(data, function(lastId) {
			// repopulate employees on client
			mysql.get_employees(function(employees) {
				client.emit('populate', employees);
			});
		});
	});
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