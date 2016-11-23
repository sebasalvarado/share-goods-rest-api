var http = require('http');
var fs = require('fs');
var pg = require('pg');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var routes = require('./routes');
var app = express();


pg.defaults.ssl = true; //always keep true!!!
var conString = "postgres://nxlatahqfspior:LfDdATwlKEdEoDes7Yxfza0QR-@ec2-23-23-107-82.compute-1.amazonaws.com:5432/d5lrfb7jjdfu63";
client = new pg.Client(conString);
client.connect(function(err) {
	//error
	if (err) {
		return console.error('could not connect to postgres', err);
	}
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Set up to use a session
app.use(cookieParser('SECRET'));
app.use(session({
		secret:'notsosecret'
}));

// Middleware that simplifies the process of parsing and reading the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // Supports URL encoded bodies
	extended:true
}));


app.get('/users', routes.getUserByEmail);
app.post('/listings',routes.postListing);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
