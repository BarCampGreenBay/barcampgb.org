var proxyquire = require('proxyquire');//.noPreserveCache();
var db = proxyquire('../../src/modules/db', {
	'../config': {
		env: {
			dev: false,
			prod: true
		},
		db: {
			host: 'host',
			name: 'name'
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
	it('should connect to db with host and name', function() {
		spyOn(db.connection, 'open');
		db.connect();
		expect(db.connection.open).toHaveBeenCalledWith('host', 'name');
	});
});