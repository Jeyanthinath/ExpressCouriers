function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('tim').innerHTML =
    h + ":" + m + ":" + s;
    if(h+7 > 14 ) {
        document.getElementById("extra").style.display = "block";
        document.getElementById('extra').innerHTML='<strong>Caution!</strong> Parcel Rates will be off 20% Extra cost'
    }
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function estimate(){
    let name=$('#name').val();
    let address=$('#address').val();
    let parcel1=$('#parcel1').val();
    let parcel2=$('#parcel2').val();
    let parcel3=$('#parcel3').val();
}

$(function() {
    $('#parcel1_b #parcel2_b parcel3_b').bootstrapToggle({
      on: 'Brittle',
      off: 'NA'
    });
  })

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function estimate_parcel(){
    let city=$('#city').val();
    
    let wt1=$('#parcel1').val();
    let wt2=$('#parcel2').val();
    let wt3=$('#parcel3').val();
    
    let bt1=$('#parcel1_b').prop('checked');
    let bt2=$('#parcel2_b').prop('checked');
    let bt3=$('#parcel3_b').prop('checked');
    
    let bt=[bt1,bt2,bt3];
    let wt=[wt1,wt2,wt3];
    console.log(wt)
    let flag=0;
    let brittle;
    let total;
        $( ".result" ).html('');
        wt.forEach(function(val,index){
            brittle=0;
            
            if(bt[index]){
                brittle=1;
            }
            if(val){
            $.get( "/estimate/"+city+"/"+val+"/"+brittle+"/", function( data ) {
                data=JSON.parse(data);
                if(data.amount){
                    $( ".result" ).append( "<li> Parcel "+(index+1)+":  &#8377; "+data.amount+"</li>" );
                    total += data.amount;
                }
                else if ( data.error){
                    $('.result').append( "<li> Parcel "+(index+1)+": Size Overlimit </li>" );
                    flag=1;
                }
                //alert( "Load was performed.with html"+data );
                sleep(200);
                
            });
            }
        });
        wt.forEach(function(val,index){
            console.log("I is is"+val+" and item is "+index);
        });
        
         
         $('#place_order').show();
        
}


function submit_order(){
    let city=$('#city').val();
    
    let wt1=$('#parcel1').val();
    let wt2=$('#parcel2').val();
    let wt3=$('#parcel3').val();
    
    let bt1=$('#parcel1_b').prop('checked');
    let bt2=$('#parcel2_b').prop('checked');
    let bt3=$('#parcel3_b').prop('checked');
    
    let bt=[bt1,bt2,bt3];
    let wt=[wt1,wt2,wt3];
    console.log(wt)
    let flag=0;
    let brittle;
        $( ".result" ).html('');
        wt.forEach(function(val,index){
            brittle=0;
            
            if(bt[index]){
                brittle=1;
            }
            
            $.get( "/submit_order/"+city+"/"+string(val)+"/"+string(brittle)+"/", function( data ) {
                data=JSON.parse(data);
                if(data.amount){
                    $( ".result" ).append( "<li> Parcel "+(index+1)+":  &#8377; "+data.amount+"</li>" );
                }
                else if ( data.error){
                    $('.result').append( "<li> Parcel "+(index+1)+": Size Overlimit </li>" );
                    flag=1;
                }
                //alert( "Load was performed.with html"+data );
                sleep(300);
                
            });
        });
        wt.forEach(function(val,index){
            console.log("I is is"+val+" and item is "+index);
        });
        if(!flag)
         $('#place_order').show();
        
}

function check_avail(){
    let city=$('#city').val();
    $.get( "/avail/"+city+"/", function( data ) {
        console.log(data)
        data=JSON.parse(data);
        $(".result").html(data.avail);
        alert( "Load was performed.with html"+data.avail );
    });
}