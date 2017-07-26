var express = require('express');
var reload = require('reload');
var io = require('socket.io')();
var app = express();
var dataFile = require('./data/data.json');


app.set('port',process.env.PORT || 3000);
app.set('appData',dataFile);
app.set('view engine', 'ejs');
app.set('views', 'app/views');

//global variables
app.locals.siteTitle = 'Roux Meetups';
app.locals.allSpeakers = dataFile.speakers;

app.use(express.static('app/public'))
app.use(require('./routes/index'));
app.use(require('./routes/speakers'));
app.use(require('./routes/feedback'));
app.use(require('./routes/api'));
app.use(require('./routes/chat'));

var server = app.listen(app.get('port'),function(){
	console.log('Listening ' + app.get('port'));
});

io.attach(server);

io.on('connection',function(socket){
	console.log('User Connected');

	socket.on('disconnect',function(){
		console.log('User Disconnected');
	});

	socket.on('postMessage',function(data){
		io.emit('updateMessages',data);
	})
});

reload(server,app);