//Initializes javascript for divs that have the .datepicker class on document.ready
$(document).ready(function(){

    let inputChange = function(element){
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

        let dateWrapper = $(this).find(".date-wrapper"),
            id = $(this).attr("id");

        //$(this).attr("id", id + "_datepicker");
        Calendar.scaffoldDatepicker(dateWrapper, id);
        //End MVC Scaffold//
        inputChange($(this));
        
    });
    //Attaches a toggle to clicking the input that will reveal the datepicker.
    $(".datepickerInput").click(function(e){
        $(this).parent().find(".calendar-wrapper").slideToggle(300);
    });

            //I want to maybe close the picker on outside click, but it's on the back burner at the moment.
    //Calendar.closePickerOnOutsideClick();
    // $(".closeClick").click(function(e){
    //     console.log($(this));
    //     console.log($(this).closest("table"));    
    // });
});

