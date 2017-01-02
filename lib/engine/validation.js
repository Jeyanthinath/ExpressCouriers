let user_parcel_limit = 3;
let brittle_charges_gm = 5/100;
let nightly_charges_percent = 20;

let min_weight=100;
let max_weight=1000;
let parcel_roundoff=100;

let max_parcel={};
max_parcel.count=50;
max_parcel.weigth=5000;


let validation_engine=module.exports = {
    //function to check the limit of the day
    check_EachLimit: function (weight){
        if(max_weight >= weight){
            return 1; //ok
        }
        else{
            return 0; //not ok
        }
    } ,
    
    //function to check the userlimit 
    check_UserLimit : function(){
        let limit=1; //hardlimit
        if(limit<=3){
            return 1;
        }
        else
            return 0;
    },
    
    //function to check parcelLimit
    check_parcelLimit : function(){
        let limit1=1; //limit for first pickup db
        let limit2=1; //limit for second pickup db
        if(limit1 && limit2){
            return 1;
        }
        else 
            return 0;
    },
    
    //fucntion to accept parcel
    accept_parcel :function (limit) {
        if(this.check_DayLimit(limit) && this.check_UserLimit() && this.check_parcelLimit()){
            return 1;
        }
        else{
            return 0;
        }
    }
};