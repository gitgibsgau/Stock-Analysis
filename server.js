"use strict";
var compression = require('compression');
const express = require('express');
const app = express();
const request = require('request');
var cheerio = require('cheerio');
var scraper = require('table-scraper');
app.set('port', process.env.PORT || 3000);
var url = "";

app.use(compression());
app.use(express.static('public'));

app.get('/', function(req, res){
  res.set({
  	'Content-Type': 'text/html',
  	'Access-Control-Allow-Origin': '*',
  });
  res.sendFile(__dirname + '/index.html');  
});

app.get('/map', function(req, res){
  res.set({
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*',
  });
  res.sendFile(__dirname + '/map.html');  
});

app.get('/chart', function(req, res){
  res.set({
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*',
  });
  res.sendFile(__dirname + '/highstocks.html');  
});

app.get('/currency', function(req, res){
  var currencyURL = 'http://api.fixer.io/latest?base=USD';
  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  request(currencyURL, function(err, resp, body) {
      if(err){
        console.log(err);
      }else{
        console.log("check1");
        console.log(body);
        res.send(body);
      }
    });
   
});

app.post('/api', function(req, res){
  
  req.on('data',function(data){
  	url = data.toString();
  	console.log(url);
    
    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    
    request(url, function(err, resp, body) {
      if(err){
        console.log(err);
      }else{
        console.log("check1");
        console.log(body);
        res.send(body);
      }
    });
  });
});

app.get('/crawler', function(req, res){
  var url = 'http://www.marketwatch.com/tools/stockresearch/globalmarkets/intIndices.asp';
  scraper
  .get(url)
  .then(function(tableData) {
    var t1 = tableData[1];
    var t2 = tableData[2];
    var t3 = tableData[3];
    var t4 = tableData[4];
    var table = [t1,t2,t3,t4];
    res.send(table);

  });
});



app.listen(app.get('port'), () => console.log('Server running on port 3000'));
