var Calendar = (function(originalCalendar){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        days = ["S", "M", "T", "W", "T", "F", "S"];

    let getHiddenDate = function(date) {
        return "<div class='hidden'><span class='titleMonth'>" + (date.getMonth() + 1) + "</span><span class='titleDay'>" + date.getDate() + "</span><span class='titleYear'>" + date.getFullYear() + "</span></div>";
    };

    originalCalendar.scaffoldDatepicker = function(dateWrapper, id){
        id = id.split("_datepicker");
        dateWrapper.append("<label for='" + id + "_input" + "'>Datepicker:</label>");
        dateWrapper.append("<input type='text' id='" + id + "_input" + "' class='form-control datepickerInput' style='background-color:white;' readOnly value=''>");
        dateWrapper.append("<div class='calendar-wrapper' style='display:none'></div>");

        let calWrapper = dateWrapper.find('.calendar-wrapper');

        calWrapper.append("<div class='date-text text-center'></div>");
        calWrapper.append("<div class='month-year-picker text-center'></div>");
        calWrapper.append("<div class='calendar'></div>");
    };

    originalCalendar.emptyInput = function(id){
        $("#" + id + "_input").attr("value", null);
    };

    originalCalendar.populateInput = function(id, date){
        let selectedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

        $("#" + id + "_input").attr("value", selectedDate);
    };

    originalCalendar.populateTop = function(id, date){
        $("#" + id).find(".date-text").append(getHiddenDate(date));
        $("#" + id).find(".month-year-picker").append("<a href='#' style='text-decoration:none'><span class='prev-month' style='color:black'>&#9664;&nbsp;&nbsp;&nbsp;</span></a><select class='month-dropdown' style='border-radius:5px; border:1px solid rgba(0,0,0,.05)'></select>&nbsp;&nbsp;<select class='year-dropdown' style='border-radius:5px; border:1px solid rgba(0,0,0,.05);'></select><a href='#' style='text-decoration:none'><span class='next-month' style='color:black;'>&nbsp;&nbsp;&nbsp;&#9654; </span></a>");
    };

    originalCalendar.populateMonthDropdown = function(id, date){
        for (let i = 0; i < 12; i++) {
            if (date.getMonth() == i) {
              $("#" + id).find(".month-dropdown").append("<option value='" + i + "' selected>" + months[i] + "</options>");
            }
            else {
              $("#" + id).find(".month-dropdown").append("<option value='" + i + "'>" + months[i] + "</options>");
            }
        }
    };

    originalCalendar.populateYearDropdown = function(id, date){
        for (let i = date.getFullYear() - 112; i < date.getFullYear() + 15; i++) {
            if (date.getFullYear() == i) {
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

    originalCalendar.addDays = function(id, date, firstDay, lastDay, daysInMonth){
        $("#" + id).find("table").append("<tbody></tbody>");
        let calBlockArray = [];
        //add empty calendar blocks for the days form last month
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
        //fills remaining cells with empty days for next month
        for (let i = 0; i < (7 - lastDay.getDay()-1); i++){
            calBlockArray.push("<td></td>")
        }
        let thisWeek;
        for (let i = 1; i <= calBlockArray.length; i++){
            thisWeek += calBlockArray[i];
            if (i%7 === 0){
                $("#" + id).find("tbody").append("<tr>" + thisWeek + "</tr>");
                thisWeek = "";
            }
        }
    };

    originalCalendar.clearAndToday = function(id){
        $("#" + id).find(".calendar").append("<div class='row'><div class='col-sm-6 text-left closeClick clearInput'><button type='button' class='btn btn-default'><strong class='pointer'>Clear</strong></button></div><div class='today-month col-sm-6 text-right closeClick'><button type='button' class='btn btn-primary'><strong>Today</strong></button></div></div>");
    }

    return originalCalendar;

})(Calendar || {});