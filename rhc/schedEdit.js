var util = require('./util');
/*
	Returns a random course from one of the groups in groups object
	if groupName is passed in, it will return a random class from that specific group
*/
function getRandCourse(groups,groupName){
	if(groupName){
		i = groupName;
	} else {
		var groupNames = Object.keys(groups);
		var i = groupNames[util.rand(groupNames.length)];
	}
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
/*
	Adds a random course to the passed in schedule based on the schedulePrefs.
	If groupName is defined, it will pick a random course from that group 
*/
function addRandCourse(schedulePrefs,oSched,groupName){
		var sched = oSched.slice();
		var course = getRandCourse(schedulePrefs.groups,groupName);
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
}
/*
	removes a random course, if groupName is passed in, it will remove
	a group from that groupname
*/
function removeRandCourse(schedulePrefs, oSched,groupName){
		var index, sched = oSched.slice();
		if(groupName){
			var coursesInGroup = [];
			sched.forEach(function(course,i){
				if(course.groupName === groupName){
					coursesInGroup.push(i);
				}
			});
			// sets index to negative -1 if there were no courses in groupName
			index = coursesInGroup.length? coursesInGroup[util.rand(coursesInGroup.length)] : -1;
		}else {
			index = util.rand(sched.length);
		}
		if(index >=0){
			sched.splice(index,1)
		}
		return sched;
}
function changeRandCourse(schedulePrefs, oSched){
	return this.addRandCourse(schedulePrefs,this.removeRandCourse(schedulePrefs,oSched));
}
module.exports = {
	addRandCourse:addRandCourse,
	removeRandCourse:removeRandCourse,
	changeRandCourse:changeRandCourse
};