angular.module('GroupsDirs', [])
.directive('groups', ['ScheduleFactory',function (ScheduleFactory) {
	return {
		restrict: 'E',
		templateUrl:'/partials/directives/groups.html',
		scope:{},
		link: function ($scope, iElement, iAttrs) {
			$scope.groups = ScheduleFactory.schedule.groups;
			$scope.expandGroup = function(group){
				$scope.group = $scope.groups[group];
				$scope.groupName = group;
				$scope.toggleView();
				$scope.$parent.setGroup(group)
			}
			$scope.expandCourse = function(course){
				$scope.$parent.setCourse(course)
			}
			$scope.viewGroups = true;
			$scope.toggleView = function(){
				$scope.viewGroups = !$scope.viewGroups;
			}
			$scope.removeCourse = function(course){
				ScheduleFactory.removeCourseFromGroup($scope.groupName,course);
			}
		}
	};
}])

.directive('groupsettings', ['ScheduleFactory',function (ScheduleFactory) {
	return {
		restrict: 'E',
		templateUrl:'/partials/directives/groupSettings.html',
		scope:{
			group:'=grp',
			groupName:'=name'
		},
		link: function ($scope, iElement, iAttrs) {
			$scope.setGroupPriority = function(pr){
				ScheduleFactory.setGroupPriority(groupName,pr)
			}
			$scope.priorityLevels = ['Low','Med','High','Must'];
		}
	};
}])
