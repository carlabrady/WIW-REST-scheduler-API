var router = require('express').Router();
var pool = require('./pool');

router.post('/addShift', function (req, res) {
    pool.connect(function (err, client, done) {
        var query = 'INSERT INTO shifts (manager_id, employee_id, break, start_time, end_time) VALUES ($1, $2, $3, $4, $5)';
        var values = [
            req.query.manager_id,
            req.query.employee_id,
            req.query.break,
            req.query.start_time,
            req.query.end_time
        ];
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        } else {
            client.query(query, values, function (err, result) {
                done();
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.get('/scheduleByDate', function (req, res) {
    pool.connect(function (err, client, done) {
        var query = 'SELECT * FROM shifts WHERE start_time > $1 AND end_time <= $2';
        var startDate = req.query.start;
        var endDate = req.query.end;
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        } else {
            client.query(query, [startDate, endDate], function (quErr, resObj) {
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

router.put('/updateTime', function (req, res) {
    pool.connect(function (err, client, done) {
        var query = 'UPDATE shifts SET start_time = $1, end_time = $2 WHERE id = $3';
        var shiftId = req.query.id;
        var startTime = req.query.start_time;
        var endTime = req.query.end_time;
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        } else {
            client.query(query, [startTime, endTime, shiftId], function (quErr, resObj) {
                client.end();
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            });
        }
    });
});

router.put('/changeEmployee', function (req, res) {
    pool.connect(function (err, client, done) {
        var query = 'UPDATE shifts SET employee_id = $1 WHERE id = $2';
        var shiftId = req.query.id;
        var empId = req.query.employee_id;
        if (err) {
            console.log("Error connecting: ", err);
            res.sendStatus(500);
        } else {
            client.query(query, [empId, shiftId], function (quErr, resObj) {
                client.end();
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            });
        }
    });
});

router.get('/empInfo', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        } else {
            var query = "SELECT * FROM users WHERE role = 'employee'";
            client.query(query, function (quErr, resObj) {
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