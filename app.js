var express = require('express');
var express_session = require('express-session');
var port = process.env.PORT || 3000;
var app = express();
var jf = require('jsonfile');

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
	var pageString = "getting-started-objc";

	if (session.language == "swift") {
		pageString = "getting-started-swift";
	}
	res.sendfile('build/getting-started/getting-started-connect-objc/index.html');
});

app.get('/session_test', function(req, res) {
	console.log(req.session.something);
});

app.use('/build', function(req, res, next) {
	res.writeHead(301,
	  {Location: 'http://'+req.headers.host+req.path}
	);
	res.end();
});

function queryParserForSession(request) {
	if (request.query.language != undefined) {
		session.language = request.query.language;
	};
}

app.use(express.static(__dirname + '/build'));
app.listen(port);
