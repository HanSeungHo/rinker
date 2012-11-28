// Network
var io = require('socket.io').listen(3001);



// Websocket
io.sockets.on('connection', function(client) {
	console.log('Socket.io client connected'); 

	// C# recive
	socket.on('query', function (data) {
		console.log(data);
	});

});
