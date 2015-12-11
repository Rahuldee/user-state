var express = require('express');
var bodyParser = require('body-parser');
var nocache = require('nocache');
var app = express();
var away = false;
var ledText = '';


app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(nocache());
app.enable('trust proxy');

app.set('port', (process.env.PORT || 3000));


app.get('/state', function(req, res) {
	return res.status(200).send({
		away: away
	});
});

app.post('/state', function(req, res) {
	if (req.query.away) {
		away = req.query.away;
	}
	return res.sendStatus(200);
});

app.post('/led', function(req, res) {
	if (req.body.text) {
		ledText = req.body.text;
	};
	return res.sendStatus(200);
});

app.get('/led', function(req, res) {
	if (ledText) {
		res.status(200).send(ledText);
		ledText = '';
		return;
	}
	return res.sendStatus(200);
});

app.listen(app.get('port'), function() {
	console.log('State server listening on ', app.get('port'));
});