let button = document.getElementById('connect')
let buttonPrev = document.getElementById('connectPrev')

const { ipcRenderer } = require('electron')


button.addEventListener('click', () => {
    ipcRenderer.send("connect", 'db');
})

buttonPrev.addEventListener('click', () => {
    var nconf = require('nconf');
    nconf.use('file', { file: './config.json' });

    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: nconf.get('host'),
        user: nconf.get('user'),
        password: nconf.get('password'),
        database: nconf.get('database'),
    });

    con.connect(function(err) {
        if (err) {
            alert("Error! Cannot connect to database! " + err)
            throw err;
        }else
        {
            alert("Connected successfully to the Database")
            ipcRenderer.send("connected", "first")
        }           
      });
})
