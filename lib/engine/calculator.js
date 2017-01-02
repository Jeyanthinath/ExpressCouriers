var mysql      = require('mysql');
var validator = require("./validation.js");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'c9'
});

connection.connect();


let Banglore=30;
let Delhi = 35;
let Goa = 40; 
let JK = 45;
let chennai = 50; 
let Punjab = 55;
let Chandigadh = 60;
let kolkata = 65;
let Hydrabad = 70;
let Gandinagar = 75;

let roundoff_weight=100;

//mock data
let parcel_weight=60;

let calculator = module.exports = {
    roundoff : function(weight){
        return Math.ceil(weight/roundoff_weight)*roundoff_weight;
    },
    
    amount_calc : function (location,weight,time,brittle,callback){
        
        let amount;
        let self = this

        connection.query('SELECT rate AS amt from price_list where city="'+location+'"', function(err, rows, fields) {
            console.log("Error is "+err)
          if (err != null) {
              console.log("Error in parsing")
              callback("error");
              throw err;
          }
          else{
        
              if(rows[0] == undefined){
                  callback("no such city");
              }
              
              let parcel_weight=self.roundoff(weight);
              
                console.log("Parcel for limit sending is "+parcel_weight)
              
              if( ! validator.check_EachLimit(parcel_weight) ){
                  console.log("over limit called");
                  callback("over limit");
              }
        
              console.log('The solution is: ', rows[0].amt);
              self.amount = rows[0].amt;
              
                let brit=0; 
                let exp=0;
                if(time>14){
                    exp=(self.amount*20/100)*(self.roundoff(weight)/roundoff_weight)
                }
                if(brittle!=0){
                    brit=(self.roundoff(weight)/roundoff_weight)*5;
                    console.log("Brit added is "+brit)
                }
                
                callback((self.roundoff(weight)/roundoff_weight*self.amount)+exp+brit);
          }
        });
        
        
        
    },
    
    daily_limit : function(date,city,weight,callback){
        let self = this
        //let roundoff=Math.ceil(weight/roundoff_weight)*roundoff_weight;
        //console.log("daily_limit:"+self.roundoff(weight)+" and weight is "+weight);
        
        connection.query('SELECT weight,count from day_limit where city="'+this.city+'" and Day="'+this.date+'"', function(err, rows, fields) {
            console.log("Error is "+err)
          if (err != null) {
              console.log("Error in parsing")
              callback("error");
              throw err;
          }
          else {
          }
            
        });  
        callback();
    }
    
}