$(document).ready(function() {

	var lastX = 0;
	var currentX = 0;
	var page = 1;
	maxPages = 10;

	$(window).scroll(function () {
		if (page < maxPages) {
			currentX = $(window).scrollTop();
			if (currentX - lastX > 1000 * page) {
				lastX = currentX;
				page++;
				socket.emit('get page', page);
			}
		}
	});

	// Page add
	socket.on('page', function(data) {
		if(data){
			for (i in data){
				var out = "" 
				+ "<li class='thumbnail'>"
				+ "<span>" + data[i].name + "</span>"
				+ "<a href='/search/person/" + data[i].id + "'>"
				+ "<img src='" + data[i].thumb + "'></a>"
				+ "</li>";

				$('#large_grid ul').append(out);
			}		

			gebo_gal_grid.init();
			//* image grid
			gebo_gal_grid.large();
			//* mixed grid
			gebo_gal_grid.mixed();
		}
	});

});