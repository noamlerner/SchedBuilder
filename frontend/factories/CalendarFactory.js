var fact = angular.module('CalendarFact', []);
fact.factory('CalendarFactory', [function () {	
	var factory = {};
	factory.cal = {};
	factory.days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
	factory.hours = ['8am','9am','10am','11am','12pm','1pm','2pm','3pm',
		'4pm','5pm','6pm','7pm','8pm','9pm'];
	factory.priorities = ['Never','Low','Med','High']
	factory.setPriority = function(hour,day,pr){
		factory.cal[hour][day] = pr; 
	};
	factory.hours.forEach(function(hour){
		factory.cal[hour] = {};
		for(var i = 0; i <5;i++){
			factory.cal[hour][i] = 'Med'
		}
	});	
	return factory;
}]);