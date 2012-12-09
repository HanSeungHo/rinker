$(document).ready(function() {
	var socket  = io.connect('http://localhost:3100');


	$('#nate_personScrap').click(function() {

		if ($('#start').val() == '' || $('#end').val() == '') {
			return alert('시작과 끝을 입력하세요.');
		}

		var data = {
			start: $('#nate_personStart').val(),
			end: $('#nate_personEnd').val()
		};

		//people.nate.com list parser
		socket.emit('nate person', data);
		$('#nate_personStart').val('');
		$('#nate_personEnd').val('');

	});

	$('#nate_listScrap').click(function() {

		if ($('#start').val() == '' || $('#end').val() == '') {
			return alert('시작과 끝을 입력하세요.');
		}

		var data = {
			start: $('#nate_listStart').val(),
			end: $('#nate_listEnd').val()
		};

		//people.nate.com list parser
		socket.emit('nate list', data);
		$('#nate_listStart').val('');
		$('#nate_listend').val('');

	});

	// Scraper message
	socket.on('console', function(data) {
		var out = "";
		out += "<li>"+data+"</li>";

		$('#console').append(out);
	});



});