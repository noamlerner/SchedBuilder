var days = ['M','T','W','R','F'];
function rand(i,exclude){
	var r = Math.floor(Math.random() * i)
	if(exclude){
		while(exclude.indexOf(r) !== -1){
			r = Math.floor(Math.random() * i)
		}
	}
	return r;
}
function getRandCourse(groups){	
	var groupNames = Object.keys(groups);
	var i = groupNames[rand(groupNames.length)];
	return {
		course:groups[i].courses[rand(groups[i].courses.length)],
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
		i = rand(course.sections.length, sectionsTried);
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
function addCourseToSched(schedulePrefs,sched){
	var course = getRandCourse(schedulePrefs.groups)
	sched.forEach(function(c){
		if(c.name === course.course.name){
			return false;
		}
	})
	return placeCourseInSchedule(course.course,sched,course.groupName);
}
function evaluate(sched){
	console.log(sched)
}
function schedClimber(schedulePrefs){
	sched = [];
	addCourseToSched(schedulePref,sched);
	addCourseToSched(schedulePref,sched);
	addCourseToSched(schedulePref,sched);
	evaluate(sched)
}
module.exports = function(preferences){
	schedClimber(preferences.schedule, preferences.cal);
}