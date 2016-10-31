var fact = angular.module('Schedules', []);
fact.factory('ScheduleFactory', [function () {	
	var factory = {};
	factory.schedule= {
		groups:{},
		prefHours:[13,15]
	};
	factory.addGroup = function(name){
		console.log(name);
			factory.schedule.groups[name] = {
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
	factory.setPrefHours = function(p){
		factory.schedule.prefHours = p;
	}
	factory.getMinMaxCreditHours = function(){
		var minHours = 0;
		var maxHours = 0;
		Object.keys(factory.schedule.groups).forEach(function(gr){
			if(factory.schedule.groups[gr].minHrs > 0){
				minHours+= gr.minHrs;
			}
			if(factory.schedule.groups[gr].maxHours < 0){
				maxHours = 21;
			}
			if(maxHours <21){
				maxHours += gr.maxHours;
			}else {
				maxHours = 21;
			}
		});
		return {
			minHrs:minHours || -1,
			maxHrs:maxHours || -1
		};
	}
	factory.getGroups = function(){
		return factory.schedule.groups;
	}

	return factory;
}]);