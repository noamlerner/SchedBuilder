var avilableClasses = angular.module('AvailableClassesMod', ['Classes']);
myClasses.controller('AvailableClassesCtrl', ['$scope','ClassFactory', function ($scope,ClassFactory) {
	 ClassFactory.getClasses().then(function(data){
		$scope.courses = data.data;
		$scope.major = undefined;
		$scope.setMajor = function(maj){
			$scope.major = maj;
		}
	});

}])