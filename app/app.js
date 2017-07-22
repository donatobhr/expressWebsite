var http = require('http');

var myServer = http.createServer(function(req,res){
	res.writeHead(200,{"Content-Type":"text/plain"});
	res.write('Hola mundo');
	res.end();
}).listen(3000);