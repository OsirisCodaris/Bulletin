'use strict';
//var debug = require('debug');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
let session = require('express-session')



var auth = require('./middleware/authenticate')

var routes = require('./routes/index');
var control = require('./routes/gestion');
var api_visitor = require('./routes/api/visitor');


var api_user = require('./routes/api/user');
var api_admin = require('./routes/api/admin');

var api_file = require('./routes/api/file');
var api_key = require('./routes/api/activator');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'codaris',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(auth);



app.use('/', routes);
app.use('/gestion', control);
app.use('/api/user', api_user);
app.use('/api/file', api_file);
app.use('/api/admin', api_admin);
app.use('/api/visitor', api_visitor);
app.use('/api/key', api_key);


// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});*/

app.set('port',1337);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
