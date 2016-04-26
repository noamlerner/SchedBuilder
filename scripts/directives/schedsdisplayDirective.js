angular.module('SchedsDisplayDir', [])
.directive('scheddisplay', ['GenSchedsFactory','CalendarFactory',
	function (GenSchedsFactory,CalendarFactory) {
	return {
		restrict: 'E',
		scope:{},
		templateUrl:'/partials/directives/schedsdisplay.html',
		link: function ($scope, iElement, iAttrs) {
			$scope.scheds = GenSchedsFactory.getScheds();
			$scope.days = ["M","T","W","R","F"];
			$scope.hours = CalendarFactory.hours
			$scope.i = 0;
			$scope.incrSched = function(inc){
				$scope.i += inc;
				if($scope.i < 0 || $scope.i > $scope.scheds.length-1){
					$scope.i -= inc;
				} 
				$scope.schedByDay = GenSchedsFactory.schedToDays($scope.scheds[$scope.i]);
				$scope.styles = getStyles($scope.schedByDay,$scope.days);
			}
			$scope.incrSched(-1);
		}
	};
}])
function getStyles(schedByDay,keys){
	var styles = {};
	keys.forEach(function(day,i){
		schedByDay[day].forEach(function(course,j){
			var style = getStyle();
			style.top = ((course.timeslot.start_time / 60 - 7)* 100/15) + '%'
			style.height = ((course.timeslot.end_time - course.timeslot.start_time)/60*100/15)+'%';
			style["background-color"] = colors[i+j];
			styles[course.crn] = style;
		})
	});
	return styles;
}
function getStyle(){
	// top, height, background-color
	return {
	 	'position':'absolute',
    	'width': '100%',
    	'text-align': 'center',
	}
}
var colors = [
	'#DB0A5B',
	'#9A12B3',
	'#446CB3',
	'#8E44AD',
	'#00B16A',
	'#3A539B',
	'#F89406',
	'#F2784B',
	'#F27935',
	'#AEA8D3',
	'#52B3D9',
	'#F5D76E',
	'#87D37C',
	'#86E2D5'
];