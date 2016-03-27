var data = require('./classData.js');
var fs = require('fs');	
var newData= [];
Object.keys(data).forEach(function(major){
	var courses = [];
	var maj = data[major];
	maj.ident = major;
	Object.keys(maj.classes).forEach(function(course){
		maj.classes[course].ident = course;
		courses.push(maj.classes[course]);
	});
	maj.courses = courses;
	delete maj.classes
	newData.push(maj);
})
fs.writeFileSync('./data.js', 'module.exports = ' + JSON.stringify(newData));
