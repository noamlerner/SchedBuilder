var schedEdit = require('./schedEdit');
var evaluate = require('./evaluateSched');
function applyEvaluationChanges(schedPrefs, oSched, evaluation){
	var sched = oSched.slice();
	evaluation.removeRandCourse.forEach(function(groupName){
		sched = schedEdit.removeRandCourse(schedPrefs, sched, groupName);
	});
	evaluation.addRandCourse.forEach(function(groupName){
		sched = schedEdit.addRandCourse(schedPrefs, sched, groupName);
	});
	return sched;
}
function fixSched(schedPrefs,cal,sched){
	var evaluation = evaluate(schedPrefs, cal, sched);
	var	changes = evaluation.addRandCourse.length + evaluation.removeRandCourse.length;
	var i = 0;
	while(changes >0){
		sched = applyEvaluationChanges(schedPrefs,sched,evaluation);
		evaluation = evaluate(schedPrefs, cal, sched);
		changes = evaluation.addRandCourse.length + evaluation.removeRandCourse.length;
	}
	return {sched:sched,evaluation:evaluation};
}
function schedClimber(schedPrefs,cal){
	var scheds = schedEdit.getRandNeighbors(
		schedPrefs,
		fixSched(schedPrefs,cal,[])
	);
	scheds.forEach(function())
}
module.exports = function(preferences){
	schedClimber(preferences.schedule, preferences.cal);
}