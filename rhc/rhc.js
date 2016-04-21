var schedEdit = require('./schedEdit');
var evaluate = require('./evaluateSched');
function schedClimber(schedPrefs,cal){
	sched = [];
	sched = schedEdit.addRandCourse(schedPrefs,sched);
	sched = schedEdit.addRandCourse(schedPrefs,sched);
	sched = schedEdit.addRandCourse(schedPrefs,sched);
	console.log(schedPrefs)
	// console.log(sched)
	evaluate(schedPrefs, sched);
}
module.exports = function(preferences){
	schedClimber(preferences.schedule, preferences.cal);
}