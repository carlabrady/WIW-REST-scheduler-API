var router = require('express').Router();
var bodyParser = require('body-parser');
var pool = require('./pool');

router.get('/empSchedule', function (req, res) {
    var empId = req.query.employee_id;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        } else {
            var query = 'SELECT * FROM shifts WHERE employee_id = $1 OR employee_id = null';
            client.query(query, [empId], function (quErr, resObj) {
                done();
                if (quErr) {
                    console.log('query error');
                    res.sendStatus(500);
                } else {
                    res.send(resObj.rows);
                }
            });
        }
    })
});

router.get('/coworkers', function (req, res) {
    var shiftId = req.query.shift_id;
    pool.connect(function (err, client, done) {
        function getStartEndTimes(shiftId) {
            var query = 'SELECT start_time, end_time FROM shifts WHERE id = $1';
            client.query(query, [shiftId], function (quErr, resObj) {
                done();
                if (quErr) {
                    console.log("getStartEndTimes error")
                    res.sendStatus(500);
                } else {
                    var start = resObj.rows[0].start_time;
                    var end = resObj.rows[0].end_time;
                    getCoWorkerNames(start, end);
                }
            });
        }

        function getCoWorkerNames(start, end) {
            var query = 'SELECT name FROM users JOIN shifts ON users.id = shifts.employee_id WHERE $1 <= start_time AND start_time< $2 OR $1 < end_time AND end_time <= $2';
            client.query(query, [start, end], function (quErr, resObj) {
                done();
                if (quErr) {
                    console.log("getCoWorkerNames error")
                    res.sendStatus(500);
                } else {
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

router.get('/managerInfo', function (req, res) {
    var empId = req.query.employee_id;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        } else {
            var query = 'SELECT * FROM users JOIN shifts ON users.id = shifts.manager_id WHERE employee_id = $1';
            client.query(query, [empId], function (quErr, resObj) {
                done();
                if (quErr) {
                    console.log('query error');
                    res.sendStatus(500);
                } else {
                    res.send(resObj.rows);
                }
            });
        }
    })
});

module.exports = router;