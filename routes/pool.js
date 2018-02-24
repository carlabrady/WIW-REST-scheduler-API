var Pool = require('pg').Pool;

var config = {
    host: 'localhost',
    port: 5432,
    database: 'when_i_work',
    max: 20
};

var pool = new Pool(config);
module.exports = pool;