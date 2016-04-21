var util = require('./util');
function getRandCourse(groups){	
	var groupNames = Object.keys(groups);
	var i = groupNames[util.rand(groupNames.length)];
	return {
		course:groups[i].courses[util.rand(groups[i].courses.length)],
		groupName:i
	};
}

function overlap1D(x0,x1,y0,y1){
	return !((x0 > y0  && x1 > y0) || (y0 > x0 && y0 > x1))
}
function placeCourseInSchedule(course,sched,groupName){
	var sectionsTried = [];
	var fit = false;
	var len = course.sections.length > 5 ? Math.floor(course.sections.length / 2) :
	 course.sections.length;
	var i;
	while(sectionsTried.length < len && !fit){
		i = util.rand(course.sections.length, sectionsTried);
		sectionsTried.push(i);
		var conflict = false;
		course.sections[i].timeslots.forEach(function(timeslot){
			sched.forEach(function(course){
				course.section.timeslots.forEach(function(existingTimeslot){
					if(overlap1D(existingTimeslot.start_time, existingTimeslot.end_time,
						timeslot.start_time, timeslot.end_time)){
						conflict = true;
					}
				});
			})
		});
		fit = !conflict && course.sections[i].timeslots.length > 0;
	}
	if(fit){
		sched.push({
			name:course.name,
			professors:course.professors,
			priority:course.priority,
			ident:course.ident,
			section:course.sections[i],
			groupName:groupName
		});
		return true;
	}
	return false;
}
module.exports = {
	addRandCourse:function(schedulePrefs,oSched){
		var sched = oSched.slice();
		var course = getRandCourse(schedulePrefs.groups);
		var added = false;
		var i = 0;
		while(!added && i < 20){
			added = true;
			sched.forEach(function(c){
				if(c.name === course.course.name){
					addded = false;
				}
			})
			if(added){
				added = placeCourseInSchedule(course.course,sched,course.groupName);	
				i++;
			}
		}
		return sched;
	},
	removeRandCourse:function(schedulePrefs, oSched){
		var sched = oSched.slice();
		var index = util.rand(sched.length);
		sched.splice(index,1)
		return sched;
	},
	changeRandCourse:function(schedulePrefs, oSched){
		return this.addRandCourse(schedulePrefs,this.removeRandCourse(schedulePrefs,oSched));
	}
};