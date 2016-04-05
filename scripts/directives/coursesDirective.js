angular.module('CoursesDirs', [])
.directive('courses', [function () {
	return {
		restrict: 'E',
		templateUrl:'/partials/directives/courses.html',
		scope:{
			courses:'=crs'
		},
		link: function ($scope, iElement, iAttrs) {
			$scope.expandMajor = function(major){
				$scope.major = major;
				$scope.toggleView();
			}
			$scope.expandCourse = function(course){
				console.log($scope.$parent)
				$scope.$parent.setCourse(course)
			}
			$scope.viewMajor = true;
			$scope.toggleView = function(){
				$scope.viewMajor = !$scope.viewMajor;
			}
		}
	};
}])
.directive('coursesettings', [function () {
	return {
		restrict: 'E',
		templateUrl:'/partials/directives/courseSettings.html',
		scope:{
			course:'=crs'
		},
		link: function ($scope, iElement, iAttrs) {
			$scope.groups = ['any']
				$scope.addGroup = function(){
				var name = $scope.groupName;
				if(name && $scope.groups.indexOf(name) === -1 ){
					$scope.groups.push(name);
					$scope.$parent.addGroup(name);
					$scope.curGroup = name
				}
				$scope.groupName = "";
			}
			$scope.classPr = 'Med';
			$scope.curGroup = 'any'
			$scope.setCoursePriority = function(pr){
				$scope.course.priority = pr;
			}
			$scope.removeProf = function(prof){
				$scope.course.professors.splice(
					$scope.course.professors.indexOf(prof),1
				);
			};
			$scope.priorityLevels = ['Low','Med','High','Must'];
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
			$scope.addCourseToSched = function(){
				$scope.$parent.addCourseToSched($scope.curGroup)
			}
		}
	};
}])
