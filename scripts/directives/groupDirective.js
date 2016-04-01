angular.module('GroupsDirs', [])
.directive('groups', [function () {
	return {
		restrict: 'E',
		templateUrl:'/partials/directives/groups.html',
		scope:{
			groups:'=grps'
		},
		link: function ($scope, iElement, iAttrs) {
			$scope.expandGroup = function(group){
				$scope.group = $scope.groups[group];
				$scope.$parent.setGroup(group)
				$scope.toggleView();
			}
			$scope.expandCourse = function(course){
				$scope.$parent.setCourse(course)
			}
			$scope.viewGroups = true;
			$scope.toggleView = function(){
				$scope.viewGroups = !$scope.viewGroups;
			}
			$scope.removeCourse = function(course){
				$scope.group.courses.splice($scope.group.courses.indexOf(course),1)
			}
		}
	};
}])

.directive('groupsettings', [function () {
	return {
		restrict: 'E',
		templateUrl:'/partials/directives/groupSettings.html',
		scope:{
			group:'=grp',
			groupName:'=name'
		},
		link: function ($scope, iElement, iAttrs) {
			$scope.setGroupPriority = function(pr){
				$scope.group.priority = pr;
			}
			$scope.priorityLevels = ['Low','Med','High','Must'];

		}
	};
}])
