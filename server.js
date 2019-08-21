const mysql      = require('mysql');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port  = process.env.PORT || 4000;
app.listen(port, (err) => {
  if (err) console.log(err);
  else {
    console.log(`Server is running on the port : ${port}`);
  }
});
let output = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./Bank-Search-App/dist/Bank-Search-App'));
app.get('/', (req, res) => {
        res.sendFile(path.resolve('./Bank-Search-App/dist/Bank-Search-App/index.html'));

});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var connection = mysql.createPool({
  host     : 'remotemysql.com',
  user     : 'iUkRAxjXOO',
  password : 'NDOZDgiuie',
  database : 'iUkRAxjXOO',
  port : "3306"
});

app.get('/api/branches/autocomplete', (req, res) => {
  let query = req.query.q;
  let limit = req.query.limit;
  let offset = req.query.offset;
  let sql;
  if (query && limit && offset) {
    sql = `SELECT * FROM bank_branches WHERE MATCH(branch) AGAINST('${query}' IN BOOLEAN MODE) LIMIT ${limit} OFFSET ${offset}`;
  }
  else if(query && limit) {
    sql = `SELECT * FROM bank_branches WHERE MATCH(branch) AGAINST('${query}' IN BOOLEAN MODE) LIMIT ${limit}`;   
  }
  else if (query) {
    sql = `SELECT * FROM bank_branches WHERE MATCH(branch) AGAINST('${query}' IN BOOLEAN MODE)`;
  }
  connection.query(sql, (err, results, fields) => {
     output = {
      "branches" : results 
    };
    res.json(output);
    output = {};
  }) 

});

app.get('/api/branches', (req, res) => {
  let query = req.query.q;
  let limit = req.query.limit;
  let offset = req.query.offset;
  let sql;
  if (limit && offset  && query){
         sql =`SELECT * FROM bank_branches WHERE MATCH(ifsc) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(branch) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(bank_name) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(city) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(district) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(state) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(address) AGAINST('${query}' IN BOOLEAN MODE) LIMIT ${limit} OFFSET ${offset}`;
  }
  else if (query && limit) {
         sql =`SELECT * FROM bank_branches WHERE MATCH(ifsc) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(branch) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(bank_name) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(city) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(district) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(state) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(address) AGAINST('${query}' IN BOOLEAN MODE) LIMIT ${limit}`;
  }
  else if(query) {
          sql = `SELECT * FROM bank_branches WHERE MATCH(ifsc) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(branch) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(bank_name) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(city) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(district) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(state) AGAINST('${query}' IN BOOLEAN MODE) OR MATCH(address) AGAINST('${query}' IN BOOLEAN MODE)`; 
  }
  connection.query(sql, (err, results, fields) => {
    if (err) console.log(err);
    console.log(results);
    output = {
      "branches" : results
    }

    res.json(output);
  })
})

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./Bank-Search-App/dist/Bank-Search-App/index.html'));

})


