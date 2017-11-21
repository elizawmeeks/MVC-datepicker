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
        timeWrapper.append("<input type='text' id='" + id + "' class='form-control timepickerInput' style='background-color:white;' readOnly value='00:00'>");
        timeWrapper.append("<div class='timeSelect-wrapper' style='display:none'></div>");

        let timeSelect = timeWrapper.find('.timeSelect-wrapper'),
            hourBlock = [],
            minBlock = [],
            amPMBlock = [],
            thisRow;
        timeSelect.append("<div class='hour hidden' data-selected='false'>00</div>");
        timeSelect.append("<div class='min hidden' data-selected='false'>00</div>");
        timeSelect.append("<div class='amPM hidden' data-selected='false'>00</div>");
        timeSelect.append("<table class='table hourTable'></table>");
        console.log("time table", $(this).find("table"));
        $(this).find(".hourTable").append("<thead></thead>");
        $(this).find(".hourTable thead").append("<tr></tr>");
        for (var i = 0; i <6; i++){
            $(this).find("tr").append("<th></th>");
        }
        $(this).find(".hourTable").append("<tbody></tbody>");
        for (let i = 1; i <= 12; i++){
            hourBlock.push("<td align='center' id='num-" + i + "-" + id + "' class='num pointer timeClick'>" + i + "</td>")
        }
        
        for (let i = 1; i <= hourBlock.length; i++){
            thisRow += hourBlock[i - 1];
            if (i%6 === 0 ){
                $(this).find(".hourTable tbody").append("<tr>" + thisRow + "</tr>");
                thisRow = "";
            }
        }

        timeSelect.append("<table class='table minTable'></table>");
        $(this).find(".minTable").append("<thead></thead>");
        $(this).find(".minTable thead").append("<tr></tr>");
        for (var i = 0; i < 6; i++){
            $(this).find(".minTable tr").append("<th></th>");
        }
        $(this).find(".minTable").append("<tbody></tbody>");
        for (let i = 0; i <= 55; i++){
            if (i % 5 === 0){
                if (i < 10){
                    minBlock.push("<td align='center' id='num-" + i + "-" + id + "' class='num pointer timeClick'>0" + i + "</td>")
                }else{
                    minBlock.push("<td align='center' id='num-" + i + "-" + id + "' class='num pointer timeClick'>" + i + "</td>")
                }
            }
        }
        thisRow = "";
        for (let i = 1; i <= minBlock.length; i++){
            thisRow += minBlock[i - 1];
            if (i % 6 === 0 ){
                $(this).find(".minTable tbody").append("<tr>" + thisRow + "</tr>");
                thisRow = "";
            }
        }

        timeSelect.append("<table class='table amPMTable'></table>");
        $(this).find(".amPMTable").append("<thead></thead>");
        $(this).find(".amPMTable thead").append("<tr></tr>");
        for (var i = 0; i < 6; i++){
            $(this).find(".amPMTable tr").append("<th></th>");
        }
        $(this).find(".amPMTable").append("<tbody></tbody>");
        for (let i = 0; i < 6; i++){
            if (i === 2){
                amPMBlock.push("<td align='center' id='am-" + id + "' class='num am pointer timeClick'>AM</td>")
            } else if (i === 3){
                amPMBlock.push("<td align='center' id='pm-" + id + "' class='num pm pointer timeClick'>PM</td>")
            } else {
                amPMBlock.push("<td></td>")
            }
        }
        console.log("ampmblock", amPMBlock);
        thisRow = "";
        for (let i = 1; i <= amPMBlock.length; i++){
            thisRow += amPMBlock[i - 1];
        }
        $(this).find(".amPMTable tbody").append("<tr>" + thisRow + "</tr>");
        thisRow = "";

        Time.beginSequence(id);
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
        $(this).parent().find(".selectedTime").removeClass("selectedTime");
    });

});

