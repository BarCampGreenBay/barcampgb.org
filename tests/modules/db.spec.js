var proxyquire = require('proxyquire');
var db = proxyquire('../../src/modules/db', {
	'../config': {
		env: {
			dev: false,
			prod: true
		},
		db: {
			host: 'host',
			name: 'name',
			port: 'port'
		}
	}
});

describe('Db module', function() {
	it('should export connection', function() {
		expect(db.connection).toBeDefined();
	});
	it('should export connect', function() {
		expect(db.connect).toBeDefined();
	});
	it('should connect to db with host, name, and port', function() {
		spyOn(db.connection, 'open');
		db.connect();
		expect(db.connection.open).toHaveBeenCalledWith('host', 'name', 'port');
	});
});
