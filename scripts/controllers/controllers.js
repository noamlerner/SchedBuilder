angular.module('SchedControllers', ['Classes','GeneratedScheds'])
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
.controller('GenerateScheduleCtrl', ['$scope','$http','$location',
	'ScheduleFactory','CalendarFactory','GenSchedsFactory',
	function ($scope,$http,$location, ScheduleFactory,CalendarFactory,GenSchedsFactory) {
		var obj = {};
		obj.schedule = ScheduleFactory.schedule;
		obj.cal = CalendarFactory.cal;
		$http({
		    url: '/generateSchedules',
		    method: "POST",
		    data: JSON.stringify(obj),
		    headers: {'Content-Type': 'application/json'}
		}).then(function(response){
			GenSchedsFactory.setScheds(response.data);
			$location.path('displayScheds')
		}, function(){
			console.log("ERROR")
		});
	}
]);
