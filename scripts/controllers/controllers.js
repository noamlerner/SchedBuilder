angular.module('SchedControllers', ['Classes'])
.controller('SchedSettingsCtrl', ['$scope','ClassFactory','ScheduleFactory', 
	function ($scope,ClassFactory, ScheduleFactory) {
	 ClassFactory.getClasses().then(function(data){
		$scope.courses = data.data;
		$scope.addGroup = function(name){
			ScheduleFactory.addGroup(name)
		}
		$scope.addGroup('any');	
		$scope.setCourse = function(cl){
			$scope.course = cl;
			$scope.classPr = cl? cl.priority : 'Med';
			if(cl){
				$scope.setGroup();
			}	
		}	
		$scope.setGroup = function(gr){
			$scope.groupName = gr;
			if(gr){
				$scope.group = ScheduleFactory.schedule.groups[gr];
				$scope.setCourse();
			}
		}
		$scope.addCourseToSched = function(curGroup){
			ScheduleFactory.addCourseToGroup(curGroup,$scope.course)	
		}
	});

}])
.controller('GeneralSettinsCtrl', ['$scope','ScheduleFactory', 
	function ($scope,ScheduleFactory) {	
		
	}
])
.controller('GenerateScheduleCtrl', ['$scope','ScheduleFactory','CalendarFactory', 
	function ($scope,ScheduleFactory,CalendarFactory) {
		var obj = {};
		obj.schedule = ScheduleFactory.schedule;
		obj.cal = CalendarFactory.cal;
		console.log(obj);
	}
]);