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
	queryParserForSession(req);
	next();
});

app.get('/getting-started', function (req, res) {
	handleGettingStarted("getting-started-connect", req, res);
});

app.get('/getting-started-ide', function(req, res) {
	handleGettingStarted("getting-started-ide", req, res);
});

app.get('/getting-started-connection', function(req, res) {
	handleGettingStarted("getting-started-connect", req, res);
});

app.get('/getting-started-project', function(req, res) {
	handleGettingStarted("getting-started-project", req, res);
});

app.get('/getting-started-basiccommands', function(req, res) {
	handleGettingStarted("getting-started-basiccommands", req, res);
});

function handleGettingStarted(path, req, res) {
	var pageString = "getting-started-connect-objc";

	//Prevent browser caching causing language switching to break
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

	if (session.language != undefined) {
		console.log("Serving page for language " + session.language);
		pageString = path + "-" + session.language;
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
}

function queryParserForSession(request) {
	if (request.query.language != undefined) {
		if (isLanguageValid(request) == true) {
			session.language = request.query.language;
			console.log("Setting language to " + session.language);
		}
	}
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
