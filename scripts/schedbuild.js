var sched = angular.module('SchedBuild', ['ngRoute','SchedControllers','SchedDirs']);
sched.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/sched', {
        templateUrl: './partials/builder.html',
      }).
      when('/general',{
      	templateUrl:'./partials/general.html'
      }).
      otherwise({
        redirectTo: '/sched'
      });
}]);
