var fact = angular.module('Schedules', []);
fact.factory('ScheduleFactory', [function () {	
	var factory = {};
	factory.schedule= {
		groups:{}
	};
	factory.addGroup = function(name){
			schedule.groups[name] = {
				courses:[],
				priority:'Med',
				minHrs:-1,
				maxHrs:-1,
				minCourses:-1,
				maxCourses:-1
			};

	}
	factory.addCourseToGroup = function(groupName,course){
			var contained = false;
			factory.schedule.groups[groupName].courses.forEach(function(cr){
				if(cr.name === course.name){
					contained = true;
				}
			})
			if(!contained){
				factory.schedule.groups[groupName].courses.push(course);
			}	
	}
	factory.removeCourseFromGroup = function(groupName,course){
		factory.schedule.groups[groupName]
		.courses.splice(factory.schedule.groups[groupName].courses.indexOf(course),1)
	}
	factory.setGroupPriority = function(groupName,pr){
		factory.schedule.groups[groupName].priority = pr;
	}
	return factory;
}]);