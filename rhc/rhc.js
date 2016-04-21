var schedEdit = require('./schedEdit');
function evaluate(sched){
	console.log(sched)
}
function schedClimber(schedPref,cal){
	sched = [];
	sched = schedEdit.addRandCourse(schedPref,sched);
	evaluate(sched)
	sched = schedEdit.changeRandCourse(schedPref,sched)
	evaluate(sched)
}
module.exports = function(preferences){
	schedClimber(preferences.schedule, preferences.cal);
}