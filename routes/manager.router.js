var router = require('express').Router();
var pool = require('./pool');

router.post('/addShift', function (req, res) {
    pool.connect(function (err, client, done) {
      var query = 'INSERT INTO shifts (manager_id, employee_id, break, start_time, end_time) VALUES ($1, $2, $3, $4)';
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
      }
      client.query(query, values, function (err, result) {
        done();
        if (err) {
          console.log("Error inserting data: ", err);
          res.sendStatus(500);
        } else {
          res.status(203);
        }
      });
    });
  });

router.get('/scheduleByDate', function (req, res) {
    console.log("in get schedule");
    var startDate = req.query.start;
    var endDate = req.query.end;
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        } else {
            var query = 'SELECT * FROM shifts WHERE start_time > $1 AND end_time <= $2';
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

module.exports = router;