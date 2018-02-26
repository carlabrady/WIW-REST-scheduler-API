var router = require('express').Router();
var bodyParser = require('body-parser');
var pool = require('./pool');

router.get('/empSchedule', function (req, res) {
    console.log('in get empSchedule', req.query);
    var empId = req.query.employee_id;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM shifts WHERE employee_id = $1', [empId], function (quErr, resObj) {
                console.log('queryreturn', resObj.rows);
                done();
                if (quErr) {
                    console.log('query error');
                    res.sendStatus(500);
                } else {
                    console.log("sending back after query")
                    res.send(resObj.rows);
                } 
            }); 
        }
    })
});

router.get('/coworkers', function (req, res) {
    console.log('in get coworkers', req.query);
    var shiftId = req.query.shift_id;
    pool.connect(function (err, client, done) {
        function getStartEndTimes(shiftId) {
            client.query('SELECT start_time, end_time FROM shifts WHERE employee_id = $1', [shiftId], function (quErr, resObj) {
                done();
                if (quErr) {
                    console.log("getStartEndTimes error")
                    res.sendStatus(500);
                } else {
                    var start = resObj.rows.start_time;
                    var end = resObj.rows.end_time;
                    getCoWorkerNames(start, end);
                }
            });
        }
        function getCoWorkerNames(start, end) {
            client.query('SELECT name FROM users JOIN shift ON users.id = shift.employee_id WHERE $1 <= start_time < $2 OR $1 < end_time <= $2', [start, end], function (quErr, resObj) {
                done();
                if (quErr) {
                    console.log("getCoWorkerNames error")
                    res.sendStatus(500);
                } else {
                    console.log("double query complete");
                    res.send(resObj.rows);
                }
            });
        }
        if (err) {
            console.log('connection error');
            done();
            res.sendStatus(500);
        } else {
            getStartEndTimes(shiftId);
        }
    })
});

module.exports = router;