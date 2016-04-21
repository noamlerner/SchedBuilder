var schedEdit = require('./schedEdit');
var prefs = {
	'Low':1,
	'Med':2,
	'High':3,
	'Must':5,
	'Never':-5
};
function evaluate(schedPrefs, sched){
	/*
		Need to address:
			class-group priority
			total credit horus/classes
			min/max from groups
			calendar times
	*/
	var score = 0;
	sched.forEach(function(course){
		score += prefs[course.priority]*
			prefs[schedPrefs.groups[course.groupName].priority];
	});	
}

function schedClimber(schedPrefs,cal){
	sched = [];
	sched = schedEdit.addRandCourse(schedPrefs,sched);
	evaluate(schedPrefs, sched);
	console.log(cal)
}
module.exports = function(preferences){
	schedClimber(preferences.schedule, preferences.cal);
}