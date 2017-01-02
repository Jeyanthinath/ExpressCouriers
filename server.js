/**
 *  Server.js , entry point for the application and loading moudles page.
 * 
 */

var express = require('express');
var app = express();

var logger = require('winston');
logger.add(logger.transports.File, { filename: 'log/server.log' });

//setting static files path
app.use('/static', express.static(__dirname+"/static/"));

//calculator
let calc=require("./lib/engine/calculator.js");


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'c9'
});

connection.connect();

app.get('/', function (req, res) {
  logger.info('Hello world called');
  res.send('Hello World!');
});

app.get('/login',function(req,res){
    res.render('login.pug');
});

app.get('/home',function(req,res){
    res.render('home.pug');
});

app.get('/estimate/:loc/:weight/:brittle',function(req,res){
    let location=req.params.loc;
    let wt=parseInt(req.params.weight);
    let brit=parseInt(req.params.brittle);
    
    console.log(wt+" and type of weight "+typeof(wt)+" and type of bri"+typeof(brit))
    
    if(typeof(location) != "string" || typeof(wt) != "number" || typeof(brit) != "number" ) {
        res.json("{error:'invalid input'}")
    }
    
    let date=Date().slice(4,15);
    
    let hour=new Date().getHours();
    calc.amount_calc(location,wt,hour,brit,function(status){
        if(status=="error"){
            res.json("{error:1}");
        }
        else if (status=='over limit'){
            res.json('{"error":"over limit"}');
        }
        else if ( status =="no such city"){
            res.json('{"error":"no such city"}');
        }
        console.log(status+" is the res");
        res.json('{"amount":"'+status+'"}');  
    });
});

app.get('/submit_order/:city/:weight',function(req, res) {
    let city=req.params.city;
    let wt=parseInt(req.params.weight);
    let batch=1;
    let query='Update day_limit set weight=weight+"'+wt+'" where location="'+city+'" and Day="'+Date().slice(4,15)+'" and batch="'+batch+'"';
    connection.query(query, function(err, rows, fields) {
        if(err){
            console.log(err);
            res.json('{"success":"0"}');
        }
        res.json('{"success":"1"}');
    });
    

});

app.get('/avail/:city',function(req,res){
   res.json('{"avail":"100 gm or 1 parcel"}') ;
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
