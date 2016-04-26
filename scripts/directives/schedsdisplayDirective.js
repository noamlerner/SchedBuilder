angular.module('SchedsDisplayDir', [])
.directive('scheddisplay', ['GenSchedsFactory','CalendarFactory',
	function (GenSchedsFactory,CalendarFactory) {
	return {
		restrict: 'E',
		scope:{},
		templateUrl:'/partials/directives/schedsdisplay.html',
		link: function ($scope, iElement, iAttrs) {
			$scope.scheds = GenSchedsFactory.getScheds();
			console.log($scope.scheds)
			$scope.days = ["M","T","W","R","F"];
			$scope.hours = CalendarFactory.hours
			$scope.i = 0;
			$scope.schedByDay = GenSchedsFactory.schedToDays($scope.scheds[0]);
		}
	};
}])
