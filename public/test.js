$(document).ready(function() {
	var socket  = io.connect('http://localhost:3001');

	$('#search').click(function() {
		if ($('#actor').val() == '') {
			return alert('Please enter both actor!');
		}

		var data = {
			query: $('#actor').val()
		};

		socket.emit('actor', data);

		$('#actor').val('');
	});

	socket.on('result', function(data) {

		var out = "";

		$.each(data, function(i, obj) {
			out += "<li>"+obj.name+"</li>";
		});

		$('#employees').html(out);

	});

	$('#save').click(function() {

		if ($('#employee_name').val() == '' || $('#employee_salary').val() == '') {
			return alert('Please enter both name/salary!');
		}				
		var data = {
			name: $('#employee_name').val(),
			salary: $('#employee_salary').val()
		};

		socket.emit('add employee', data);
		$('#employee_name').val('');
		$('#employee_salary').val('');

	});

	socket.on('populate', function(data) {

		var out = "";

		$.each(data, function(i, obj) {
			out += "<li>"+obj.name+" is making "+obj.salary+"</li>";
		});

		$('#employees').html(out);

	});
});