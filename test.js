var client = new Array();

var net = require('net'),
    Socket = require('net').Socket,
    io = require('socket.io').listen(3001);

var SERVER = {
  HOST : '192.168.11.29',
  PORT : 3100
}
var CLIENT = {
  //HOST : '192.168.11.29'
  HOST : '203.247.161.55',
  PORT : 3100
}


// var net = require('net');
var client = net.connect(CLIENT.PORT, CLIENT.HOST, function(){
   client.on('data', function(data) {
     console.log('data:', data.toString());
   });

   client.on('error', function(err) {
     console.log('error:', err.message);
   });

   client.write('아이유가 부른 노래');
});

 
// net.createServer(function(sock) {

//     //TCP SERVER
//     console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    

//     sock.on('data', function(data) {
//         console.log('DATA ' + sock.remoteAddress + ': ' + data);
//         sock.write('SQL SUCCESS');

//         io.sockets.on('connection', function(client) {
//             console.log('Socket.io client connected'); 

//             console.log(' render ' + data);
//             // Client(web browser) send
//             // mysql.get_employees(function(employees) {
//             //     client.emit('search', employees);
//             // });

//         });

//     });
    
//     sock.on('close', function(data) {
//         console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
//     });

// }).listen(SERVER.PORT, SERVER.HOST);

      
// console.log('Server listening on ' + SERVER.HOST +':'+ SERVER.PORT);

