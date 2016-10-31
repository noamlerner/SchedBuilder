var schedEdit = require('./schedEdit');
var evaluate = require('./evaluateSched');
// the amount of times this will attempt to improve a schedule
// higher = more time but better schedule
var schedIterations = 10000;
// amount of times this will attempt to fix a schedule
//before giving up on it.
var fixAtempts = 1000;
//the number of schedules to generate
var numScheds = 10;
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
	while(changes >0 && i < fixAtempts){
		sched = applyEvaluationChanges(schedPrefs,sched,evaluation);
		evaluation = evaluate(schedPrefs, cal, sched);
		changes = evaluation.addRandCourse.length + evaluation.removeRandCourse.length;
		i++;
	}
	if(changes > 0){
		evaluation.score = -1000;
	}
	return {sched:sched,evaluation:evaluation};
}
function schedClimber(schedPrefs,cal, iterations){
	var topSched = fixSched(schedPrefs,cal,[]);
	for(var i = 0; i < iterations; i++){
		console.log('on iteration: ' + i)
		var scheds = schedEdit.getRandNeighbors(
			schedPrefs,
			topSched.sched
		);
		var fixedScheds = []
		console.log('neighbors found, fixing schedules')
		scheds.forEach(function(s){
			fixedScheds.push(fixSched(schedPrefs,cal,s));
		});
		fixedScheds.forEach(function(s){
			if(topSched.evaluation.score < s.evaluation.score){
				topSched = s;
			}
		});
	}
	return topSched;
}
module.exports = function(preferences){
	var scheds = [];
	for(var i = 0; i < numScheds; i++){
		console.log('finding schedule: '+ i)
		try {
			scheds.push(schedClimber(preferences.schedule, preferences.cal,schedIterations));
		} catch(a){
			console.log(a);
			console.log('failure experienced at ' + i);
			i--;
		}
	}
	scheds.sort(function(a,b){
		return b.evaluation.score - a.evaluation.score
	});
	console.log('done');
	console.log(scheds);
	return scheds;
}