var Calendar = (function(originalCalendar){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        days = ["S", "M", "T", "W", "T", "F", "S"];

    let getHiddenDate = function(date) {
        //Add one to the index to accomodate for the index starting at 0
        let month = date.getMonth() + 1,
            day = date.getDate(),
            year = date.getFullYear();
        return "<div class='hidden'><span class='titleMonth'>" + month + "</span><span class='titleDay'>" + day + "</span><span class='titleYear'>" + year + "</span></div>";
    };

    originalCalendar.scaffoldDatepicker = function(dateWrapper, id){
        dateWrapper.append("<label for='" + id + "'>Datepicker:</label>");
        dateWrapper.append("<input type='text' id='" + id + "' class='form-control datepickerInput' style='background-color:white;' readOnly value=''>");
        dateWrapper.append("<div class='calendar-wrapper' style='display:none'></div>");

        let calWrapper = dateWrapper.find('.calendar-wrapper');

        calWrapper.append("<div class='date-text text-center'></div>");
        calWrapper.append("<div class='month-year-picker text-center'></div>");
        calWrapper.append("<div class='calendar'></div>");
    };

    originalCalendar.emptyInput = function(id){
        $("#" + id).attr("value", null);
    };

    originalCalendar.populateInput = function(id, date){
        let selectedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        $("#" + id).attr("value", selectedDate);
    };

    originalCalendar.populateTop = function(id, date){
        let selectedDate = getHiddenDate(date);
        $("#" + id).find(".date-text").append(selectedDate);
        $("#" + id).find(".month-year-picker").append("<a href='#' style='text-decoration:none'><span class='prev-month' style='color:black'>&#9664;&nbsp;&nbsp;&nbsp;</span></a><select class='month-dropdown' style='border-radius:5px; border:1px solid rgba(0,0,0,.05)'></select>&nbsp;&nbsp;<select class='year-dropdown' style='border-radius:5px; border:1px solid rgba(0,0,0,.05);'></select><a href='#' style='text-decoration:none'><span class='next-month' style='color:black;'>&nbsp;&nbsp;&nbsp;&#9654; </span></a>");
    };

    originalCalendar.populateMonthDropdown = function(id, date){
        let selectedMonth = date.getMonth();
        for (let i = 0; i < 12; i++) {
            if (selectedMonth == i) {
              $("#" + id).find(".month-dropdown").append("<option value='" + i + "' selected>" + months[i] + "</options>");
            }
            else {
              $("#" + id).find(".month-dropdown").append("<option value='" + i + "'>" + months[i] + "</options>");
            }
        }
    };

    originalCalendar.populateYearDropdown = function(id, date){
        let selectedYear = date.getFullYear(),
            thisYear = new Date().getFullYear(),
            yearsBack = $("#" + id).data("year");

        for (let i = thisYear - yearsBack; i < thisYear + 15; i++) {
            if (selectedYear == i) {
              $("#" + id).find(".year-dropdown").append("<option value='" + i + "' selected>" + i + "</options>");
            }
            else {
              $("#" + id).find(".year-dropdown").append("<option value='" + i + "'>" + i + "</options>");
            }
        }
    };

    originalCalendar.addDayNames = function(id){
        $("#" + id).find(".calendar").append("<table class='table calTable' style='margin:0'></table>");
        $("#" + id).find("table").append("<thead></thead>");
        $("#" + id).find("thead").append("<tr></tr>");
        days.forEach(function(element) {
            $("#" + id).find("tr").append("<th class='text-center'>" + element + "</th>")
        }, this);
    };

    //Populates calendar appropriately with the dates
    originalCalendar.addDays = function(id, date, firstDay, lastDay, daysInMonth){
        $("#" + id).find("table").append("<tbody></tbody>");
        let calBlockArray = [];
        //add empty calendar blocks for the last days of the previous month
        for (let i = 0; i < (7 - (6 - firstDay.getDay())); i++) {
            calBlockArray.push("<td></td>");
        }
        //adds days from this month
        for (let i = 1; i <= daysInMonth; i++){
            if (date.getDate() == i){
                calBlockArray.push("<td align='center' id='day-" + i + "-" + id + "' class='day today closeClick pointer'>" + i + "</td>")
            } else{
                calBlockArray.push("<td align='center' id='day-" + i + "-" + id + "' class='day closeClick pointer'>" + i + "</td>");
            }
        }
        //fills remaining cells with the beginning days for next month
        for (let i = 0; i < (7 - lastDay.getDay()-1); i++){
            calBlockArray.push("<td></td>")
        }
        let thisWeek;
        //appends the table
        for (let i = 1; i <= calBlockArray.length; i++){
            thisWeek += calBlockArray[i];
            if (i%7 === 0){
                $("#" + id).find("tbody").append("<tr>" + thisWeek + "</tr>");
                thisWeek = "";
            }
        }
    };

    originalCalendar.populateClearAndToday = function(id){
        $("#" + id).find(".calendar").append("<div class='row'><div class='col-sm-6 text-left closeClick clearInput'><button type='button' class='btn btn-default'><strong class='pointer'>Clear</strong></button></div><div class='today-month col-sm-6 text-right closeClick'><button type='button' class='btn btn-primary'><strong>Today</strong></button></div></div>");
    };

    return originalCalendar;

})(Calendar || {});