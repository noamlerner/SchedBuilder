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
	while(changes >0 && i < 1000){
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
	for(var i = 0; i < 10; i++){
		console.log('finding schedule: '+ i)
		scheds.push(schedClimber(preferences.schedule, preferences.cal,100));
	}
	scheds.sort(function(a,b){
		return b.evaluation.score - a.evaluation.score
	});
	var fs = require('fs');
	fs.writeFileSync('./sampleSched.js','module.exports = '+JSON.stringify(scheds));
}