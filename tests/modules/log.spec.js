var log = require('../../src/modules/log');
describe('Log module', function() {
	it('should export a logger instance', function() {
		expect(log.info).toBeDefined();
		expect(log.error).toBeDefined();
		expect(log.warn).toBeDefined();
		expect(log.debug).toBeDefined();
	});
});