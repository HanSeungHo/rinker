// Rinker default option
var ARGV = {
	PORT: process.env.PORT || 3000,
	// Websocket host
	WS: {
		HOST: '127.0.0.1',
		PORT: 3001
	},
	// Scraper host
	SCRAPER: {
		HOST: '127.0.0.1',
		PORT: 3100
	},
	NEO4J: 'http://203.247.161.50:7474'
};

//Server setting
var SERVER = {
	PORT : 80,
	WS: {
		HOST: 'rinker.kr',
		PORT: 3001
	},
	SCRAPER: {
		HOST: '127.0.0.1',
		PORT: 3100
	},
	NEO4J: 'http://203.247.161.50:7474'
};

// MySQL database
var MYSQL = {
	CLIENT : {
		host : 'ami.hansh.kr',
		port : '3406',
		user : 'test',
		password : 'test',
		debug : false
	},
	PERSON : {
		DB    : 'repository',
		TABLE : 'people',
		LIMIT : 40,
		PAGE  : 20
	},
	MUSIC : {
		DB    : 'repository',
		TABLE : 'nate_people'
	},
	MOVIE : {
		DB    : 'repository',
		TABLE : 'nate_people'
	},
	MAIN : {
		DB 		: 'ent',
		MUSIC : 'music',
		MOVIE : 'movie',
		PERSON: 'person',
	},
	QUERY : {
		DB 		: 'log',
		TABLE : 'search'
	}
};

// Neo4J databse
var NEO4J = {
	HOST : ARGV.NEO4J,
	NODE : 'node',
	REL  : {  
		MUSIC : 'music',
		MOVIE : 'movie',
		ISSUE : 'isuue'
	},
	VAL  : { 
		NAME : 'name',
		BIRTH : 'birth',
		THUMB : 'thumb' 
	}
}

// Console setting
process.argv.forEach(function (val, index, array) {
	if(val == '-p') {
		if(process.argv[index+1]){
			ARGV.PORT = process.argv[index+1];
		}else {
			console.log ('ERROR: node app -p [PORT]');
			process.exit();
		}
	}else if(val == 'server') {
		//Server setting
		ARGV = SERVER;
		console.log('-- SERVER SETTING --\n', ARGV);
	}else if(val == '-h') {
		console.log('-- Rinker HELP --');
		process.exit();
	}
});

exports.ARGV = ARGV;
exports.MYSQL = MYSQL;
exports.NEO4J = NEO4J;
