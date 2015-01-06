var express = require('express');
var express_session = require('express-session');
var port = process.env.PORT || 3000;
var app = express();
var jf = require('jsonfile');

app.disable('etag');

var objectiveCiOSJSON;

jf.readFile('src/content/getting-started/objectivec.json', function(err, obj) {
	objectiveCiOSJSON = obj;
});

var session;

app.use(express_session({secret: '23847486-3C36-42CE-B52F-BF511BA694FA'}));
app.set('view engine', 'ejs');

app.use('/', function(req, res, next) {
	session = req.session;
	console.log(session.language);
	queryParserForSession(req);
	next();
});

app.get('/getting-started', function (req, res) {
	var pageString = "getting-started-connect-objc";

	//Prevent browser caching causing language switching to break
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

	if (session.language != undefined) {
		console.log("Serving page for language " + session.language);
		pageString = "getting-started-connect-" + session.language;
	}

	if (req.query.language != undefined) {
		console.log(req.path);
		res.writeHead(301,
			{Location: 'http://'+req.headers.host+req.path}
		);
		res.end();
	} else {
		res.sendfile('build/getting-started/' + pageString + '/index.html');
	}
});

app.get('/session_test', function(req, res) {
	console.log(req.session.something);
});

// app.use('/build', function(req, res, next) {
// 	res.writeHead(301,
// 	  {Location: 'http://'+req.headers.host+req.path}
// 	);
// 	res.end();
// });

function queryParserForSession(request) {
	if (request.query.language != undefined) {
		if (isLanguageValid(request) == true) {
			session.language = request.query.language;
			console.log("Setting language to " + session.language);
		}
	}

	console.log(request.query.language + " " + session.language);
}

function isLanguageValid(request) {
	if (request.query.language == undefined) {return true}

	if (request.query.language == 'objc' || request.query.language == 'swift' || request.query.language == 'android') {
		return true;
	} else {
		return false;
	}
}

app.use(express.static(__dirname + '/build'));
app.listen(port);
