const finalhandler = require('finalhandler');
const http = require('http');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');

const index = serveIndex(process.argv[2], { 'icons': true });

const serve = serveStatic(process.argv[2]);

const server = http.createServer(function onRequest(req, res) {
	const done = finalhandler(req, res);
	serve(req, res, function onNext(err) {
		if (err) return done(err);
		index(req, res, done);
	});
});

server.listen(8080);
