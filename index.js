require('dotenv').load();


var express = require('express');
var app = express();
app.disable('etag');
app.disable('x-powered-by');


app.use('/' + process.env.WEB_PATH, express.static('public'));

app.use(function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(process.env.WEB_PORT || 3002, function(){

	var host = server.address().address;
	var port = server.address().port;

	console.log('Elbrus listening at http://%s:%s', host, port);

});
