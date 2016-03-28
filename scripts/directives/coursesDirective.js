angular.module('CoursesDirs', [])
.directive('major', [function () {
	return {
		restrict: 'E',
		scope:{
           major:"=maj"
		},
		replace:true,
		templateUrl:'/partials/directives/major.html',
		link: function ($scope, iElement, iAttrs) {
			$scope.expand = function(){
				$scope.$parent.setMajor($scope.major)
			}
		}
	};
}])
.directive('course', [function () {
	return {
		restrict: 'E',
		templateUrl:'/partials/directives/course.html',
		replace:true,
		scope:{
			course:'=crse'
		},
		link: function (scope, iElement, iAttrs) {
			
		}
	};
}])