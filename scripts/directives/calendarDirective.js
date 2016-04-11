angular.module('CalendarDirs', ['CalendarFact'])
.directive('calendar', ['CalendarFactory',function (CalendarFactory) {
	return {
		restrict: 'E',
		scope:{},
		templateUrl:'/partials/directives/calendar.html',
		link: function ($scope, iElement, iAttrs) {
			$scope.days = CalendarFactory.days;
			$scope.hours = CalendarFactory.hours;
			$scope.cal = CalendarFactory.cal;
			$scope.setPriority = function(hour,day){
				CalendarFactory.setPriority(hour,day,$scope.pr);
			}
			$scope.pr = 'High'
			$scope.setPr = function(pr){
				$scope.pr = pr;
			}
		}
	};
}])