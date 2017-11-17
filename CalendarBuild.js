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
        Calendar.populateClearAndToday(id);
        Calendar.previousMonthClick(id);
        Calendar.nextMonthClick(id);
        Calendar.todayClick();
        Calendar.dayClick(id);
        Calendar.monthDropdownClick(id);
        Calendar.yearDropdownClick(id);
        //clearInputClick has to be called before closeClicks or the event.stopImmediatePropagation() event will stop the clear button from clearing. No moving!
        Calendar.clearInputClick();
        Calendar.closeClicks();
    };

    originalCalendar.buildNullCalendarMonth = function(id, date){
        let days = getFirstLastAndNumberOfDaysInMonth(date),
            datepickerId = id,
            inputId = id.split("_datepicker")[0];

        Calendar.clearCalendar(datepickerId);
        Calendar.emptyInput(inputId, date);
        populateCalendar(datepickerId, date);
    }

    originalCalendar.buildCalendarMonth = function(id, date){
        let days = getFirstLastAndNumberOfDaysInMonth(date),
            datepickerId = id,
            inputId = id.split("_datepicker")[0];

        Calendar.clearCalendar(datepickerId);
        Calendar.populateInput(inputId, date);
        populateCalendar(datepickerId, date);
    };

    return originalCalendar;

})(Calendar || {});