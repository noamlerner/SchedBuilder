angular.module('SchedControllers', ['SettingsMod','AvailableClassesMod','MyClassesMod'])
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
			console.log('asdf')
			$scope.groupName = gr;
			if(gr){
				$scope.group = $scope.schedule.groups[gr];
				$scope.setCourse();
			}
		}
		$scope.addCourseToSched = function(curGroup){
			ScheduleFactory.addCourseToGroup(curGroup,$scope.course)	
		}
	});

}])