var Time = (function(originalTime){
    
    originalTime.buildNullTimePicker = function(id, timeSelect, element){
        
        timeSelect.append("<div class='hour hidden' data-selected='false'>00</div>");
        timeSelect.append("<div class='min hidden' data-selected='false'>00</div>");
        timeSelect.append("<div class='amPM hidden' data-selected='true'>AM</div>");
        timeSelect.append("<table class='table hourTable'></table>");
        
        originalTime.finishNullBuild(id, timeSelect, element);
    };
    
    originalTime.buildTimePicker = function(id, timeSelect, element, value){
        let hours = value.split(":")[0].trim(),
            min = value.split(":")[1].split(" ")[0].trim(),
            noon = value.split(":")[1].split(" ")[1].trim();
            
        timeSelect.append("<div class='hour hidden' data-selected='false'>" + hours + "</div>");
        timeSelect.append("<div class='min hidden' data-selected='false'>" + min + "</div>");
        timeSelect.append("<div class='amPM hidden' data-selected='false'>" + noon + "</div>");
        timeSelect.append("<table class='table hourTable'></table>");
        
        originalTime.finishBuild(id, timeSelect, element, hours, min, noon);
    };
    
    originalTime.finishNullBuild = function(id, timeSelect, element){
        let hourBlock = [],
            minBlock = [],
            amPMBlock = [],
            thisRow;

        element.find(".hourTable").append("<tbody></tbody>");
        for (let i = 1; i <= 12; i++){
            hourBlock.push("<td align='center' id='num-" + i + "-" + id + "' class='num pointer timeClick'>" + i + "</td>")
        }
        
        for (let i = 1; i <= hourBlock.length; i++){
            thisRow += hourBlock[i - 1];
            if (i%6 === 0 ){
                element.find(".hourTable tbody").append("<tr>" + thisRow + "</tr>");
                thisRow = "";
            }
        }

        timeSelect.append("<table class='table minTable'></table>");
        element.find(".minTable").append("<thead></thead>");
        element.find(".minTable thead").append("<tr></tr>");
        for (var i = 0; i < 6; i++){
            element.find(".minTable tr").append("<th></th>");
        }
        element.find(".minTable").append("<tbody></tbody>");
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
                element.find(".minTable tbody").append("<tr>" + thisRow + "</tr>");
                thisRow = "";
            }
        }

        timeSelect.append("<table class='table amPMTable'></table>");
        element.find(".amPMTable").append("<thead></thead>");
        element.find(".amPMTable thead").append("<tr></tr>");
        for (var i = 0; i < 6; i++){
            element.find(".amPMTable tr").append("<th></th>");
        }
        element.find(".amPMTable").append("<tbody></tbody>");
        for (let i = 0; i < 6; i++){
            if (i === 2){
                amPMBlock.push("<td align='center' id='am-" + id + "' class='num am pointer selectedTime timeClick'>AM</td>")
            } else if (i === 3){
                amPMBlock.push("<td align='center' id='pm-" + id + "' class='num pm pointer timeClick'>PM</td>")
            } else {
                amPMBlock.push("<td></td>")
            }
        }
        
        thisRow = "";
        for (let i = 1; i <= amPMBlock.length; i++){
            thisRow += amPMBlock[i - 1];
        }
        element.find(".amPMTable tbody").append("<tr>" + thisRow + "</tr>");
        thisRow = "";

        timeSelect.append("<div class='row'></div>");
        timeSelect.find(".row").append("<div class='col-sm-6 text-left clearInput'><button class='btn btn-default' type='button'>Clear</button></div>");
        timeSelect.find(".row").append("<div class='col-sm-6 text-right okClick'><button class='btn btn-primary' type='button'>OK</button></div>");

        Time.timeClick();
        Time.clearClick(id);
        Time.okClick(id);
    };
    
    originalTime.finishBuild = function(id, timeSelect, element, hour, min, noon){
        let hourBlock = [],
            minBlock = [],
            amPMBlock = [],
            thisRow;

        element.find(".hourTable").append("<tbody></tbody>");
        for (let i = 1; i <= 12; i++){
            hourBlock.push("<td align='center' id='num-" + i + "-" + id + "' class='num pointer timeClick'>" + i + "</td>")
        }
        
        for (let i = 1; i <= hourBlock.length; i++){
            thisRow += hourBlock[i - 1];
            if (i%6 === 0 ){
                element.find(".hourTable tbody").append("<tr>" + thisRow + "</tr>");
                thisRow = "";
            }
        }

        timeSelect.append("<table class='table minTable'></table>");
        element.find(".minTable").append("<thead></thead>");
        element.find(".minTable thead").append("<tr></tr>");
        for (var i = 0; i < 6; i++){
            element.find(".minTable tr").append("<th></th>");
        }
        let hourTD = element.find(".hourTable td");
        for (let i = 0; i < hourTD.length; i++){
            if (hourTD[i].innerHTML === hour){
                $(hourTD[i]).addClass("selectedTime");
            }
        }

        element.find(".minTable").append("<tbody></tbody>");
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
                element.find(".minTable tbody").append("<tr>" + thisRow + "</tr>");
                thisRow = "";
            }
        }
        let minTD = element.find(".minTable td");
        for (let i = 0; i < minTD.length; i++){
            if (minTD[i].innerHTML === min){
                $(minTD[i]).addClass("selectedTime");
            }
        }

        timeSelect.append("<table class='table amPMTable'></table>");
        element.find(".amPMTable").append("<thead></thead>");
        element.find(".amPMTable thead").append("<tr></tr>");
        for (var i = 0; i < 6; i++){
            element.find(".amPMTable tr").append("<th></th>");
        }
        element.find(".amPMTable").append("<tbody></tbody>");
        for (let i = 0; i < 6; i++){
            if (i === 2){
                amPMBlock.push("<td align='center' id='am-" + id + "' class='num am pointer selectedTime timeClick'>AM</td>")
            } else if (i === 3){
                amPMBlock.push("<td align='center' id='pm-" + id + "' class='num pm pointer timeClick'>PM</td>")
            } else {
                amPMBlock.push("<td></td>")
            }
        }
        
        thisRow = "";
        for (let i = 1; i <= amPMBlock.length; i++){
            thisRow += amPMBlock[i - 1];
        }
        element.find(".amPMTable tbody").append("<tr>" + thisRow + "</tr>");
        thisRow = "";
        
        let amPMTD = element.find(".amPMTable td");
        for (let i = 0; i < amPMTD.length; i++){
            if (amPMTD[i].innerHTML === noon){
                $(amPMTD[i]).addClass("selectedTime");
            }
        }

        timeSelect.append("<div class='row'></div>");
        timeSelect.find(".row").append("<div class='col-sm-6 text-left clearInput'><button class='btn btn-default' type='button'>Clear</button></div>");
        timeSelect.find(".row").append("<div class='col-sm-6 text-right okClick'><button class='btn btn-primary' type='button'>OK</button></div>");

        Time.timeClick();
        Time.clearClick(id);
        Time.okClick(id);
    };

    return originalTime;

})(Time || {});