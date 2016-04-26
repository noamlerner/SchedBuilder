angular.module('LoadingDir', [])
.directive('loading', ['$timeout',function ($timeout) {
	return {
		restrict: 'E',
		scope:{},
		templateUrl:'/partials/directives/loading.html',
		link: function ($scope, iElement, iAttrs) {
			$scope.showDot = [true, true, true];
			$scope.onDot = 0;
			$scope.updateShowDot = function(){
				$timeout(function() {
					$scope.showDot[$scope.onDot] = !$scope.showDot[$scope.onDot];
					$scope.onDot = increment($scope.onDot,3);
					$scope.updateShowDot();
				}, 300);
			}
			$scope.updateShowDot();	
		}
	};
}])
function rand(i){
	return Math.floor(Math.random() * i);
}
function increment(onDot,max){
	return onDot >= (max-1) ? 0 : onDot+1;
}
var colors = [
	"#ECF0F1",
	"#1abc9c",
	"#2ecc71",
	"#9b59b6",
	"#34495e",
	"#f1c40f",
	"#95a5a6",
	"#bdc3c7",
	"#fd00ff",
	"#fdff00",
	"#00ff38",
	"#00f9ff",
	"#3c00ff"
]