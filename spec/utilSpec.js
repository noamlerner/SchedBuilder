describe('util.js', function() {
    var util = require('../rhc/util');
    it('should return a value less than max that doesnt have exlude values', function() {
    	var exclude = [0,1,5,6,9];
    	for(var i = 0; i < 20; i++){
    		var rand = util.rand(10,exclude);
    		expect(exclude.indexOf(rand)).toBe(-1);
    		expect(rand).toBeLessThan(10);
    	}
    });
    it('return true for 1d overlap',function(){
    	var overlap = util.overlap1D(5,10,7,15);
    	expect(overlap).toBe(true);
    });
    it('return false for non 1d overlap',function(){
    	var overlap = util.overlap1D(5,10,11,15);
    	expect(overlap).toBe(false);
    });
});