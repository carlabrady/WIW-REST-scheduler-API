// var router = require('express').Router();
// var pool = require('./pool');

// router.get('/', function (req, res) {
//     console.log('in get index');
//     var userId = req.query.id;
//     pool.connect(function (err, client, done) {
//         if (err) {
//             console.log('Pool Connection Error');
//             done();
//             res.sendStatus(500);
//         } else {
//             client.query('SELECT * FROM "user" WHERE id = $1', [userId], function (quErr, resObj) {
//                 console.log('queryreturn', resObj.rows);
//                 done();
//                 if (quErr) {
//                     console.log('query error');
//                     res.sendStatus(500);
//                 } else {
//                     console.log("sending back after query", resObj.rows.role);
//                     res.send(resObj.rows);
//                 } 
//             }); 
//         }
//     })
// });


// module.exports = router;