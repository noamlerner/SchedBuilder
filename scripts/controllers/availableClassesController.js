var avilableClasses = angular.module('AvailableClassesMod', ['Classes']);
myClasses.controller('AvailableClassesCtrl', ['$scope','ClassFactory', function ($scope,ClassFactory) {
	$scope.name = "Avilable"
	 ClassFactory.getClasses().then(function(data){
		console.log(data.data)
	});

}])