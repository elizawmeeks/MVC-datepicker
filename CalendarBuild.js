var Calendar = (function(originalCalendar){
    
    let getFirstLastAndNumberOfDaysInMonth = function(date){
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1),
            lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return days = 
            {
                firstDayOfMonth : firstDay,
                lastDayOfMonth : lastDay,
                daysInMonth : lastDay.getDate()
            };
    };

    let populateCalendar = function(id, date){
        Calendar.populateTop(id, date);
        Calendar.populateMonthDropdown(id, date);
        Calendar.populateYearDropdown(id, date);
        Calendar.addDayNames(id);
        Calendar.addDays(id, date, days.firstDayOfMonth, days.lastDayOfMonth, days.daysInMonth);
        Calendar.clearAndToday(id);
        Calendar.previousMonthClick(id);
        Calendar.nextMonthClick(id);
        Calendar.todayClick();
        Calendar.dayClick(id);
        Calendar.monthDropdownClick(id);
        Calendar.yearDropdownClick(id);
        //clearInputClick has to be called before closeClicks or the event.stopImmediatePropagation() event will stop the clear button from clearing. No moving!
        Calendar.clearInputClick();
        Calendar.closeClicks();
    }

    // originalCalendar.appendToWrapper = function(element, id){
    //     element.append("<div class='calendar-wrapper'></div>");
    //     let calWrapper = element.find('.calendar-wrapper');
    //     calWrapper.append("<div class='date-text text-center'></div>");
    //     calWrapper.append("<div class='month-year-picker text-center'></div>");
    //     calWrapper.append("<div class='calendar'></div>");

    //     Calendar.buildCalendarMonth(id, new Date());
    // };

    originalCalendar.buildNullCalendarMonth = function(id, date){
        let days = getFirstLastAndNumberOfDaysInMonth(date),
            timepickerId = id + "_timepicker",
            inputId = id;

        Calendar.clearCalendar(id);
        Calendar.emptyInput(id, date);
        populateCalendar(id, date);
    }

    originalCalendar.buildCalendarMonth = function(id, date){
        let days = getFirstLastAndNumberOfDaysInMonth(date),
            timepickerId = id + "_timepicker",
            inputId = id;

        Calendar.clearCalendar(id);
        Calendar.populateInput(id, date);
        populateCalendar(id, date);
    };

    return originalCalendar;

})(Calendar || {});