angular.module('SchedControllers', ['SettingsMod','AvailableClassesMod','MyClassesMod'])
.controller('SchedSettingsCtrl', ['$scope','ClassFactory', function ($scope,ClassFactory) {
	 ClassFactory.getClasses().then(function(data){
		$scope.courses = data.data;
		$scope.schedule = {
			groups:{
				any:{
					courses:[]
				}
			}
		};
		$scope.addGroup = function(name){
			$scope.schedule.groups[name] = {courses:[]};

		}
		$scope.setCourse = function(cl){
			$scope.course = cl;
			$scope.classPr = cl? cl.priority : 'Med';
		}	
		$scope.addCourseToSched = function(curGroup){
			$scope.schedule.groups[curGroup].courses.push($scope.course);
			console.log($scope.schedule)
		}
	});

}])