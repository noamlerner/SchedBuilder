var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var rhc = require('./rhc/rhc');
app.use(bodyParser.json());
app.get('/*',function(req,res){
	console.log(req.params);
		res.sendFile(__dirname+'/'+req.params[0])
})
var a = function(req, res){
	console.log(req.body);
}
app.post('/generateSchedules', function(req,res){
	var schedPrefs = req.body;
	var scheds = rhc(schedPrefs);
	res.send(JSON.stringify(scheds));
});

app.listen(3000, function () {
  	console.log('Schedbuild up and running! listening on port 3000.');
});
