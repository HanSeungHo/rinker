// Websocket host
exports.WS = {
	HOST : 'http://localhost:3001',
	SCRAPER : 'http://localhost:3100'
}

// MySQL database
exports.MYSQL = {
	CLIENT : {
		host : 'ami.hansh.kr',
		port : '3406',
		user : 'test',
		password : 'ttest',
		debug : false
	},
	PERSON : {
		DB    : 'repository',
		TABLE : 'people',
		LIMIT : 40
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
		DB : 'ent',
		MUSIC : 'music',
		MOVIE : 'movie',
		PERSON : 'person',
	},
	QUERY : {
		DB    : 'log',
		TABLE : 'query'
	}
};

// Neo4J databse
exports.NEO4J = {
	HOST : 'http://203.247.161.50:7474',
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