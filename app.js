    // dependencies
var express  = require('express'),
    http     = require('http'),
    path     = require('path'),
    mongoose = require('mongoose');


    // application
var app = express();


    // database
mongoose.connect('mongodb://localhost/pingpong');


    // config
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

    // middleware
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

    // development
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

    // routes
require('./routes')(app);

    // server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
