/*http gets the courses for a semester from courseoff*/
var https = require('https');
var fs = require('fs');


function makeRequest(options){
  var httpopts = {
    host: 'soc.courseoff.com',
    path: '/gatech/terms/201708/majors/' + options.p,
    method: 'GET'
  };
  var response = "";
  var req = https.request(httpopts, function(res) {
      res.on('data', function(d) {
        response += d;
      });
      res.on('end',function(){
        options.cb(response,options)
      })
    });

  req.end();

  req.on('error', function(e) {
    console.error(e);
  });
}
var classData = {};
function getCourses(m){
    var majors = JSON.parse(m);
    majors.forEach(function(maj){
        classData[maj] = {};
        var options = {
           p:maj.ident +'/courses',
           cb:getSections,
           major:maj
        };    
        makeRequest(options);
    });
}
var classCount = 0;
function getSections(c,opts){
    var courses = JSON.parse(c);
    courses.forEach(function(course){ 
        classCount++;
        var options = JSON.parse(JSON.stringify(opts)); 
        options.p += '/'+course.ident+'/sections';
        options.course = course
        options.cb = buildData
        makeRequest(options)
    });
}
var sectionCount = 0;
function buildData(r, options){
    var major = options.major.ident;
    if(!classData[major]){
        classData[major] = {
            name: options.major.name,
            classes:{}
        };
    }
    try{
      classData[major].classes[options.course.ident] = {
          name:options.course.name,
          sections:JSON.parse(r)
      };
      sectionCount++
      console.log('classCount-sectionCount '+classCount + '---'+sectionCount);
      if(classCount === sectionCount){
          console.log('-----WRITTEN')
          writeIt();
      }
    } catch(err){
      console.log('failed call, trying again')
      makeRequest(options)
    }
}
makeRequest({
    p:'',
    cb:getCourses
});

function writeIt(){
    fs.writeFileSync('./courseData/classData.js', 'module.exports = ' + JSON.stringify(classData));
}