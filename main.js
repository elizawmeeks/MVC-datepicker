//Initializes javascript for divs that have the .datepicker class on document.ready
$(document).ready(function(){

    let changeInput = function(element){
        let elementId = element.attr("id");
        
        if (element.find("input").attr("value") === ""){
            Calendar.buildNullCalendarMonth(elementId, new Date());
        } else {
            let inputDate = new Date(element.find("input").attr("value"));
            Calendar.buildCalendarMonth(elementId, inputDate);
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
        changeInput($(this));
        
    });
    
    $(".timepicker").each(function(){
        $(this).attr("class", "timepicker form-group");
        $(this).append("<div class='time-wrapper'></div>");
        let timeWrapper = $(this).find(".time-wrapper"),
            id = $(this).attr("id");
        $(this).attr("id", id + "_timepicker");
        timeWrapper.append("<label for='" + id + "'>Timepicker:</label>");
        timeWrapper.append("<input type='text' id='" + id + "' class='form-control datepickerInput' style='background-color:white;' readOnly value='00:00'>");
        timeWrapper.append("<div class='timeSelect-wrapper''></div>");

        let timeSelect = timeWrapper.find('.timeSelect-wrapper'),
            numBlock = [];
        timeSelect.append("<table class='table'></table>");
        console.log("time table", $(this).find("table"));
        //$(this).find("table").append("<thead></thead>");
        $(this).find("table").append("<tbody></tbody>");
        for (let i = 1; i < 10; i++){
            numBlock.push("<td align='center' id='num-" + i + "-" + id + "' class='num pointer'>" + i + "</td>")
        }
        numBlock.push("<td></td>");
        numBlock.push("<td align='center' id='num-0-" + id + "' class='num pointer'>0</td>");
        numBlock.push("<td></td>");
        let thisRow;
        for (let i = 1; i <= numBlock.length; i++){
            thisRow += numBlock[i - 1];
            if (i%3 === 0 ){
                $(this).find("tbody").append("<tr>" + thisRow + "</tr>");
                thisRow = "";
            }
        }
    });
    //Attaches a toggle to clicking the input that will reveal the datepicker.
    $(".datepickerInput").click(function(e){
        $(this).parent().find(".calendar-wrapper").slideToggle(300);
    });

});

