angular.module('schedSettingsDirs', ['Schedules'])
.directive('schedsettings', ['ScheduleFactory',function (ScheduleFactory) {
	return {
		restrict: 'E',		
		scope:{},
		templateUrl:'/partials/directives/schedsettings.html',
		link: function ($scope, iElement, iAttrs) {
			$scope.minMaxHrs = ScheduleFactory.getMinMaxCreditHours();
			$scope.setPrefHours = function(p){
				ScheduleFactory.setPrefHours([$scope.prefHrsMin, $scope.prefHrsMax]);
			}
			$scope.prefHrsMin = ScheduleFactory.schedule.prefHours[0];
			$scope.prefHrsMax = ScheduleFactory.schedule.prefHours[1];
		}
	};
}])