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
			if(cl){
				$scope.setGroup();
			}	
		}	
		$scope.setGroup = function(gr){
			$scope.groupName = gr;
			if(gr){
				$scope.group = $scope.schedule.groups[gr];
				$scope.setCourse();
			}
		}
		$scope.addCourseToSched = function(curGroup){
			$scope.schedule.groups[curGroup].courses.push($scope.course);
			console.log($scope.schedule)
		}
	});

}])