var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var empRouter = require('./routes/employee.router');
// var mgrRouter = require('./routes/manager.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/employee', empRouter);
// app.use('/manager', mgrRouter);

app.listen(5005, function() {
  console.log('up on 5005');
});