// MySQL database
exports.MYSQL = {
	CLIENT : {
		host : 'ami.hansh.kr',
		port : '3406',
		user : 'test',
		password : 'ttest'
	},
	PERSON : {
		DB    : 'repository',
		TABLE : 'nate_people',
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