var assert = require('assert');
var request = require("request");





var validator=require('../lib/engine/validation.js');
var calc = require('../lib/engine/calculator.js');

describe('validator', function() {
  describe('LimitCheck', function() {
    
    let limit={};
    limit.weight=100;
    limit.count=10;
    
    
    it('Checking the Day limit and it should return 1', function() {
      assert.equal(1,validator.check_DayLimit(limit));
    });
    
    it('Checking the User limit and it should return 1', function() {
      assert.equal(1,validator.accept_parcel(limit));
    });
    
  });
});


describe('Caculator', function() {
  describe('Weight Check', function() {
    
    let weight1=60;
    let weight2=160;
    let parcel={}
        parcel.weight=1100;
        parcel.limit=1;
    let time1=11;
    let time2=14;
        
    it('Checking the weight 60 it should return 100', function() {
      assert.equal(100,calc.roundoff(weight1));
    });
    
    it('Checking the weight 160 it should return 200', function() {
      assert.equal(200,calc.roundoff(weight2));
    });
    
    it('Checking the weight 1100 it should return 0', function() {
      assert.equal(0,validator.accept_parcel(parcel));
    });
    
    it('Checking the price before 3PM for weight 60 it should return price for 100', function() {
      assert.equal(50,calc.amount_calc("chennai",weight1,time1));
    });
    
    it('Checking the price after 3PM for weight 60 it should return price for 100 with 20% Extra', function() {
      assert.equal(60,calc.amount_calc("chennai",weight1,time2));
    });
    
  });
});

/**

//test test-case
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});


//checking the url state
describe('ServerStatus', function() {
  describe('HomePage', function() {
    let url="https://disasterapp-jeyanthinath1.c9users.io/";
    
     it("returns status 200", function(done) {
      request.get(url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });

    it("returns the Hello world message", function(done) {
      request.get(url, function(error, response, body) {
        assert.equal("Hello World!",body);
        done();
      });
    });

  });
});

**/