var Calendar = (function(originalCalendar){
    
    let updateDay = function(id, day) {
        $("#" + id).find(".titleDay").html(day);
        $("#" + id).find(".today").removeClass("today");
        $("#day-" + day + "-" + id).addClass("today");
    };

    originalCalendar.previousMonthClick = function(id){
        $(".prev-month").click(function () {
            let thisId = $(this).closest(".datepicker").attr("id");
            let newDate = new Date(parseInt($("#" + id).find(".titleYear").html()), parseInt($("#" + id).find(".titleMonth").html()) - 2, parseInt($("#" + id).find(".titleDay").html()));
            
            //if the previous month (ex Sept) has fewer days than the current month (ex Oct) and one of those end days is selected(ie Oct 31), set the current day to the last day of the new month (ex Sept 30)
            if (newDate.getDate() !== parseInt($("#" + id).find(".titleDay").html())){
                console.log("it's different! newDate.getDate() is " + newDate.getDate() + " and titleDay is " + $("#" + id).find(".titleDay").html());
                newDate = new Date($("#" + id).find(".titleYear").html(), $("#" + id).find(".titleMonth").html() - 1, 0);
            }

            Calendar.populateInput(thisId, newDate);
            Calendar.buildCalendarMonth(thisId, newDate);
        });
    };

    originalCalendar.nextMonthClick = function(id){
        $(".next-month").click(function () {
            let thisId = $(this).closest(".datepicker").attr("id");
            let date = new Date(parseInt($("#" + id).find(".titleYear").html()), parseInt($("#" + id).find(".titleMonth").html()), parseInt($("#" + id).find(".titleDay").html()));

            //if the next month (ex Feb) has fewer days than the present month (ex Jan) and one of the extra days is selected in the present month (ex Jan 31), select the last day of the next month (ex Feb 28).
            if (date.getDate() !== parseInt($("#" + id).find(".titleDay").html())){
                date = new Date(parseInt($("#" + id).find(".titleYear").html()), parseInt($("#" + id).find(".titleMonth").html()) + 1, 0);

            }
            
            Calendar.populateInput(thisId, date);
            Calendar.buildCalendarMonth(thisId, date);
        });
    };

    originalCalendar.todayClick = function(){
        $(".today-month").click(function () {
            let thisId = $(this).closest(".datepicker").attr("id");
            let date = new Date();
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            
            Calendar.buildCalendarMonth(thisId, date);
        });
    };

    originalCalendar.dayClick = function(id){
        $(".day").click(function () {
            let thisID = $(this).closest(".datepicker").attr("id");
            let day = $(this).html();
        
            updateDay(thisID, day);

            let date = new Date($("#" + id).find(".titleYear").html(), $("#" + id).find(".titleMonth").html() - 1, day);
            Calendar.buildCalendarMonth(thisID, date);
        });
    };

    originalCalendar.monthDropdownClick = function(id){
        $(".month-dropdown").change(function () {
            let thisId = $(this).closest(".datepicker").attr("id");
            let date = new Date($("#" + id).find(".titleYear").html(), $("#" + id).find(".month-dropdown option:selected").val(), 1);
        
            Calendar.buildCalendarMonth(thisId, date);
        });
    };

    originalCalendar.yearDropdownClick = function(id){
        $(".year-dropdown").change(function () {
            let thisID = $(this).closest(".datepicker").attr("id");
            let date = new Date($("#" + id).find(".year-dropdown option:selected").val(), $("#" + id).find(".titleMonth").html() - 1, 1);
        
            Calendar.buildCalendarMonth(thisID, date);
        });
    };

    originalCalendar.closeClicks = function(){
        $(".calendar-wrapper").each(function(){
            var calWrapper = $(this);
            console.log(calWrapper, "calWrapper");
            let closeClicks = calWrapper.find(".closeClick");
            closeClicks.each(function(){
                $(this).click(function(e){
                    calWrapper.slideToggle(300);
                    //e.preventDefault();
                    e.stopImmediatePropagation();
                    //originalCalendar.clearInputClick();
                });
            });
        });
    };

    originalCalendar.clearInputClick = function(){
        $(".clearInput").each(function(){
            $(this).click(function(event){
                let id = $(this).closest(".datepicker").attr("id");
                Calendar.buildNullCalendarMonth(id, new Date());
            });
        });
    };

    originalCalendar.closePickerOnOutsideClick = function(){
        $(document).click(function(event){
            console.log("document.click", $(event.target));
            if($(event.target) == $("div.calendar-wrapper")[0]){
                console.log("has class calendar-wrapper");
            }
            // if (calendarStyle !== ""){
            //     console.log("style is empty");
            //     $(".calendar-wrapper").attr("style", "display:none;");
            // }
        });
    };

    return originalCalendar;

})(Calendar || {});