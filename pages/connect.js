let button = document.getElementById('connect')
const { ipcRenderer } = require('electron');
var mysql = require('mysql');
var nconf = require('nconf');

form = document.getElementById('form')



button.addEventListener('click', () => {
    let host = form.elements['host'].value
    let name = form.elements['name'].value
    let username = form.elements['username'].value
    let password = form.elements['password'].value
   
    var con = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: name
    });

    con.connect(function(err) {
        if (err) {
            alert("Error! Cannot connect to database! " + err)
            throw err;
        }else{
            let toBeCreated
            con.query("SHOW TABLES LIKE 'products';", (error, results, fields) => {
                if(results.length >= 1)
                {
                    toBeCreated = 0
                }else
                {
                    toBeCreated = 1
                    
                }
            })
      
            if(toBeCreated == 1){
              con.query("CREATE TABLE products (product_id INT, name TEXT, quantity INT, description TEXT, price FLOAT)", (err, res) => {
                  if (err) {
                      alert("Error while creating the table " + err)
                      throw err
                  }
              })
            }else
            {
              alert("Table Products already exists. It won't be created again")
            }
      
          nconf.use('file', { file: './config.json' });
          nconf.load()
          nconf.set('host', host)
          nconf.set('user', username)
          nconf.set('password', password)
          nconf.set('database', name)
          
          nconf.save((err) => {
              if(err)
              {
                  alert("Error while saving your file " + err.message)
                  return
              }
              alert("Database data saved successfully");
          })
      
          ipcRenderer.send("connected", "")
        }
      });
      
})