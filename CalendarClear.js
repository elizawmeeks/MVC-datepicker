var Calendar = (function(originalCalender){
    
    originalCalender.clearCalendar = function(id){
        let calendar = $("#" + id);
        
        calendar.find(".date-text").html("");
        calendar.find(".month-year-picker").html("");
        calendar.find(".calendar").html("");
    };

    return originalCalender;

})(Calendar || {});