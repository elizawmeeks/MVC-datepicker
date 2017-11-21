//Initializes javascript for divs that have the .datepicker class on document.ready
$(document).ready(function(){

    let changeDateInput = function(element){
        let elementId = element.attr("id");
        
        if (element.find("input").attr("value") === ""){
            Calendar.buildNullCalendarMonth(elementId, new Date());
        } else {
            let inputDate = new Date(element.find("input").attr("value"));
            Calendar.buildCalendarMonth(elementId, inputDate);
        }
    }

    let changeTimeInput = function(id, timeSelect, element){
        console.log("changeTimeInput element", element);
        let elementId = element.attr("id");
        
        if (element.find("input").attr("value") === ""){
            Time.buildNullTimePicker(id, timeSelect, element);
        } else {
            let inputValue = element.find("input").attr("value");
            Time.buildTimePicker(id, timeSelect, element, inputValue);
        }
    }
    //Builds out datepicker input, builds the (hidden) box the calendar will go in, and builds null calendar month (eventually allow it to be either null or prefilled with a date).
    $(".datepicker").each(function(){
        //Scaffold with MVC//
        $(this).attr("class", "datepicker form-group");
        $(this).append("<div class='date-wrapper'></div>");
        $(this).attr('data-year', '1000');

        let dateWrapper = $(this).find(".date-wrapper"),
            id = $(this).attr("id");

        $(this).attr("id", id + "_datepicker");
        Calendar.scaffoldDatepicker(dateWrapper, id);
        //End MVC Scaffold//
        changeDateInput($(this));
        
    });
    
    $(".timepicker").each(function(){
        $(this).attr("class", "timepicker form-group");
        $(this).append("<div class='time-wrapper'></div>");
        let timeWrapper = $(this).find(".time-wrapper"),
            id = $(this).attr("id"),
            element = $(this);
        $(this).attr("id", id + "_timepicker");
        timeWrapper.append("<label for='" + id + "'>Timepicker:</label>");
        timeWrapper.append("<input type='text' id='" + id + "' class='form-control timepickerInput' style='background-color:white;' readOnly value=''>");
        timeWrapper.append("<div class='timeSelect-wrapper' style='display:none'></div>");

        let timeSelect = timeWrapper.find('.timeSelect-wrapper');
        console.log("timepicker.each element", element);
        changeTimeInput(id, timeSelect, element);
        
    });
    //Attaches a toggle to clicking the input that will reveal the datepicker.
    $(".datepickerInput").click(function(e){
        $(this).parent().find(".calendar-wrapper").slideToggle(300);
    });
    $(".timepickerInput").click(function(e){
        $(this).parent().find(".timeSelect-wrapper").slideToggle(300);
        $(this).parent().find(".timeSelect-wrapper").find(".hour").data('selected', false);
        $(this).parent().find(".timeSelect-wrapper").find(".min").data('selected', false);
        $(this).parent().find(".timeSelect-wrapper").find(".amPM").data('selected', false);
    });

});

