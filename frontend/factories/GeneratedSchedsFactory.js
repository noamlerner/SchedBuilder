var fact = angular.module('GeneratedScheds', []);
fact.factory('GenSchedsFactory', [function () {	
	var factory = {scheds:[]};
	factory.setScheds = function(scheds){
		this.scheds = scheds;
	}
	factory.getScheds = function(){
		return this.scheds;
	}
	factory.schedToDays = function(sched){
		var days = {
			"M":[],
			"T":[],
			"W":[],
			"R":[],
			"F":[]
		};
		sched.sched.forEach(function(course){
			course.section.timeslots.forEach(function(timeslot){
				days[timeslot.day].push({
					ident:course.ident,
					name:course.name,
					timeslot:timeslot,
					credits:course.section.credits,
					instructor:course.section.instructor,
					major:course.major,
					majorName:course.majorName,
					crn:course.section.call_number
				});
			});	
		});
		return days;
	}
	return factory;
}]);