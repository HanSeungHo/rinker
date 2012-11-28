// Network
var Socket = require('net').Socket,
		io = require('socket.io').listen(3001),
		mysql = require("./db/mysql");

// TCP Socket
// var socket = new Socket();


// var net = require('net');

// var tcp_server = net.createSever(function(socket)
// {
// 	socket.write('tset');
// 	socket.end('world');
// }

// 	);

// tcp_server.listen(3100);
// socket.on('error', function(error) {
//     	console.log('Event error:');
//     	console.log(error);
//     })
//     .on('data', function(data) {
//     	console.log('Event data:');
//     	console.log(data);
//     })
//     .on('end', function() {
//     	console.log('Event end:');
//     })
//     .connect(3002, '203.247.161.50', function() {
//     	console.log('connected!!');
//  });

//windows server 54

// Websocket
io.sockets.on('connection', function(client) {
	console.log('Socket.io client connected'); 


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

	// C# recive
	socket.on('query', function (data) {
		console.log(data);
	});

});