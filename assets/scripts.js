$(document).ready(function () {

    //Date for heading
    var dateString = moment().format("dddd, MMMM Do YYYY, h:mm a");
    $("#currentDay").html(dateString);
    
    //forloop for times
    var scheduledHours = [];
    
    for (var hour = 9; hour < 18; hour++) {
        scheduledHours.push(moment({
            hour
        }).format('h  a'));
        $('.container').append(`<div class="row time-block" data-time="${hour}"> 
           <!--time-->
               <div class="col-sm col-md-2 hour"> 
                 <p class=dayHour>${moment({hour}).format('h  a')}</p>
               </div> 
               
           <!--data-->
               <div class="col-sm col-md-8 d-flex description"> 
                 <textarea class=textArea></textarea> 
               </div> 
          
           <!--save-->
               <div class="col-sm col-md-2 saveBtn">
               <i class="far fa-save fa-2x" id=icon></i>  
               </div>`);
    }
    
    
    //background color corresponding to time.
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
    
    //local storage
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
    
    //user input 
    $(".time-block").each(function(){
       $(this).find(".textArea").val(timeObject[$(this).attr("data-time")].value);
      });
    
     //save button
     $(".saveBtn").on('click', function(event){
         var timeValue = $(this).closest(".time-block").attr("data-time");
         var textValue = $(this).closest(".time-block").find(".textArea").val();
         timeObject[timeValue].value = textValue;
    
      //user input  saved local storage
         localStorage.setItem('timeObject', JSON.stringify(timeObject));
    
          //console.log(textValue)
    
     });
     
    });