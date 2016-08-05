/*Takes the course data recieved from courseoff and converts them for use with schedbuild*/
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
	delete maj.classes;
	newData.push(maj);
});
newData.forEach(function(major){
	major.courses.forEach(function(course){
		var instructors = [];
		course.sections.forEach(function(section){
			if(section.instructor){
				var instructor = section.instructor.lname.trim() + ', ' + section.instructor.fname.trim();
				if(instructors.indexOf(instructor) === -1){
					instructors.push(instructor);
				}
			}
				
		});
		course.priority= 'Med';
		course.instructors = instructors;
		course.instructors.push('Any');
		course.professors = [{name:'Any',priority:'Med'}];
		course.major = major.ident;
		course.majorName = major.name;
	})
});
fs.writeFileSync('./courses', JSON.stringify(newData));
fs.writeFileSync('./classData/coursesModule.js', '/*convenience file created by converdata.js for easy import of coursedata*/\nmodule.exports='+ JSON.stringify(newData));
