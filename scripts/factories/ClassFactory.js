var fact = angular.module('Classes', []);
fact.factory('ClassFactory', ['$http',function ($http) {	
	var eventData = {};
	    var promise;
	    var courseData = [];
	    eventData.getClasses = function (event) {
	        if(!promise){
				 promise = $http.get('./data');
	        }
	        return promise;
	    }
	    return eventData;
}]);
