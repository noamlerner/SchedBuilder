var sched = angular.module('SchedBuild', ['ngRoute','SchedControllers','SchedDirs']);
sched.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/sched', {
        templateUrl: './partials/builder.html',
      }).
      otherwise({
        redirectTo: '/sched'
      });
}]);
