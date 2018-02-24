var router = require('express').Router();
var bodyParser = require('body-parser');
var pool = require('./pool');

router.get('/empSchedule/:id', function (req, res) {
    console.log('in get empSchedule', req.params.id);
    var empId = req.body.id;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM shift WHERE employee_id = $1', [empId], function (quErr, resObj) {
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

module.exports = router;