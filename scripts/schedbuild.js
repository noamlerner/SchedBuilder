var sched = angular.module('SchedBuild', ['ngRoute','SchedControllers','SchedDirs']);
sched.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/list', {
        templateUrl: './partials/builder.html',
      }).
      otherwise({
        redirectTo: '/list'
      });
}]);