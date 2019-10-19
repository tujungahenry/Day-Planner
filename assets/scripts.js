$(document).ready(function () {

    //add the current date to the #current date id in the HTML//
    var dateString = moment().format("dddd, MMMM Do YYYY, h:mm a");
    $("#currentDay").html(dateString);
    
    //create html timeblocks with for loop starting at 9 am until 5pm//
    var scheduledHours = [];
    
    for (var hour = 9; hour < 18; hour++) {
        scheduledHours.push(moment({
            hour
        }).format('h  a'));
        $('.container').append(`<div class="row time-block" data-time="${hour}"> 
           <!--hour column-->
               <div class="col-sm col-md-2 hour"> 
                 <p class=dayHour>${moment({hour}).format('h  a')}</p>
               </div> 
               
           <!--user input text area-->
               <div class="col-sm col-md-8 d-flex description"> 
                 <textarea class=textArea></textarea> 
               </div> 
          
           <!--bootstrap saveBtn-->
               <div class="col-sm col-md-2 saveBtn">
               <i class="far fa-save fa-2x" id=icon></i>  
               </div>`);
    }
    
    
    //Check the hour of the current day to the hour represented in the HTML data-element to decide it's background color.
    var m = moment();
    $.each($(".time-block"), function (index, value) {
        let dateHour = $(value).attr("data-time");
        if (Number(dateHour) === m.hour()) {
            $(this).find("textarea").addClass('present');
        } else if (Number(dateHour) < m.hour()) {
            $(this).find("textarea").addClass('past');
        } else {
            $(this).find("textarea").addClass('future');
        }
    });
    
    //Check for local storage to set value to the object
    let timeObject = {};
      if (localStorage.getItem('timeObject')) {
          timeObject = JSON.parse(localStorage.getItem('timeObject'));
      }else{
        timeObject = {
          '9': { time: "9", value: ""},
          '10':{ time: "10", value: ""},
          '11':{ time: "11", value: ""},
          '12':{ time: "12", value: ""},
          '13':{ time: "13", value: ""},
          '14':{ time: "14", value: ""},
          '15':{ time: "15", value: ""},
          '16':{ time: "16", value: ""},
          '17':{ time: "17", value: ""}
        };
      }
    
    //set value of timeObject to equal the user input for each row 
    $(".time-block").each(function(){
       $(this).find(".textArea").val(timeObject[$(this).attr("data-time")].value);
       //console.log(this)
      });
    
     //save value to local storage on click
     $(".saveBtn").on('click', function(event){
         //set timeObject time attribute
         var timeValue = $(this).closest(".time-block").attr("data-time");
        //set timeObject value attribute
         var textValue = $(this).closest(".time-block").find(".textArea").val();
         timeObject[timeValue].value = textValue;
    
      //save user input in each object to local storage
         localStorage.setItem('timeObject', JSON.stringify(timeObject));
    
          //console.log(textValue)
    
     });
     
    });