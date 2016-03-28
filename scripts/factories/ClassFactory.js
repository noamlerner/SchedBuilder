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

// var baseURL ='https://soc.courseoff.com/gatech/terms/201601/majors/';

// function getSections($http,major, course) {
// 	console.log(course);
//   return $http.get(baseURL+ major.ident+'/courses/' +course.ident+'/sections')
//               .then(sections => sections.data)
//               .catch(e => []);
// }

// function getCourses($http,major) {
// 	console.log(major);

//   return $http.get(baseURL + major.ident+'/courses')
//               .then(courses => Promise.all(courses.data.map(course =>
//                 getSections($http,major, course).then(sections => ({[course.ident]: {name: course.name, sections: sections}})))))
//               .then(courses => angular.extend({}, ...courses))
//               .catch(e => ({}));
// }

// function getClassData($http) {
// 	console.log('reached')
//   return $http.get(baseURL)
//               .then(majors => Promise.all(majors.data.map(major =>
//                 getCourses($http,major).then(courses => ({[major.ident]: {name: major.name, classes: courses}})))))
//               .then(majors => angular.extend({}, ...majors))
//               .catch(e => ({}));
// }


// fact.factory('ClassFactory', ['$http',function ($http) {    
// 	getClassData($http).then(data => console.log(data));
// 	return {getClasses:function(){}}
// }]);