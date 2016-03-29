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
				$scope.$parent.setMajor($scope.major)
				$scope.toggleView();
			}
			$scope.expandCourse = function(course){
				$scope.$parent.setCourse(course)
			}
			$scope.viewMajor = true;
			$scope.toggleView = function(){
				$scope.viewMajor = !$scope.viewMajor;
			}
		}
	};
}])