var nconf = require('nconf');
nconf.use('file', { file: './config.json' });

var mysql = require('mysql');
var con = mysql.createConnection({
        host: nconf.get('host'),
        user: nconf.get('user'),
        password: nconf.get('password'),
        database: nconf.get('database'),
    });