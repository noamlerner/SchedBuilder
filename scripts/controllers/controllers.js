angular.module('SchedControllers', ['SettingsMod','AvailableClassesMod','MyClassesMod'])
.controller('SchedSettingsCtrl', ['$scope','ClassFactory', function ($scope,ClassFactory) {
	 ClassFactory.getClasses().then(function(data){
		$scope.courses = data.data;
		$scope.classPr = 'Med';
		$scope.schedule = {
			any:{courses:[]}
		};
		$scope.setMajor = function(maj){
			$scope.major = maj;
			$scope.setCourse();
			$scope.search = ""
		}
		$scope.groups = ['any']
		$scope.addGroup = function(){
			var name = $scope.groupName;
			if(name && $scope.groups.indexOf(name) === -1 ){
				$scope.groups.push(name);
			}
			$scope.groupName = "";
			$scope.schedule[name] = {courses:[]};
		}
		$scope.setCoursePriority = function(pr){
			$scope.course.priority = pr;
		}
		$scope.setCourse = function(cl){
			$scope.course = cl;
			$scope.curGroup = 'any';
			$scope.classPr = cl? cl.priority : 'Med';
		}	
		$scope.priorityLevels = ['Low','Med','High','Must'];
		$scope.removeProf = function(prof){
			$scope.course.professors.splice(
				$scope.course.professors.indexOf(prof),1
			);
		};
		$scope.addProf = function(prof){
			var contained = false;
			$scope.course.professors.forEach(function(p){
				if(p.name === prof.trim()){
					contained = true;
				}
			});
			if(!contained){
				$scope.course.professors.push({name:prof.trim(),priority:"Med"});
			}
		};
		$scope.addCourse = function(){
			$scope.schedule[$scope.curGroup].courses.push($scope.course);
			console.log($scope.schedule)
		}
	});

}])