var Time = (function(originalTime){
    
    originalTime.timeClick = function(){
        $(".timeClick").on("click", function(event){
            
            let inputValue = $(this).html(),
                parentTable = $(this).parents("table"),
                inputDiv = $(this).parents(".time-wrapper").find(".timepickerInput"),
                hour = $(this).parents(".timeSelect-wrapper").find(".hour").html(),
                min = $(this).parents(".timeSelect-wrapper").find(".min").html(),
                noon = $(this).parents(".timeSelect-wrapper").find(".amPM").html();
                
            noon = noon === "00" ? "" : $(this).parents(".timeSelect-wrapper").find(".amPM").html()
            
            if (parentTable.hasClass("hourTable")){
                hour = inputValue;
                inputDiv.attr("value", hour + ":" + min + " " + noon);
                $(this).parents(".timeSelect-wrapper").find(".hour").html(hour);
                $(this).parents(".timeSelect-wrapper").find(".hour").data('selected', true);
                parentTable.find(".selectedTime").removeClass("selectedTime");
                $(this).addClass("selectedTime");
            }
            if (parentTable.hasClass("minTable")){
                min = inputValue;
                inputDiv.attr("value", hour + ":" + min + " " + noon);
                $(this).parents(".timeSelect-wrapper").find(".min").html(min);
                $(this).parents(".timeSelect-wrapper").find(".min").data('selected', true);
                parentTable.find(".selectedTime").removeClass("selectedTime");
                $(this).addClass("selectedTime");
            }
            if (parentTable.hasClass("amPMTable")){
                noon = inputValue;
                inputDiv.attr("value", hour + ":" + min + " " + noon);
                $(this).parents(".timeSelect-wrapper").find(".amPM").html(noon);
                $(this).parents(".timeSelect-wrapper").find(".amPM").data('selected', true);
                parentTable.find(".selectedTime").removeClass("selectedTime");
                $(this).addClass("selectedTime");
            }
            
            let hourSelected = $(this).parents(".timeSelect-wrapper").find(".hour").data('selected'),
            minSelected = $(this).parents(".timeSelect-wrapper").find(".min").data('selected'),
            noonSelected = $(this).parents(".timeSelect-wrapper").find(".amPM").data('selected');
            
            if (hourSelected === true && minSelected === true && noonSelected === true){
                $(this).parents(".timeSelect-wrapper").slideToggle(300);
            }
            
        });
    };
    
    originalTime.clearClick = function(id){
        $(".clearInput").on("click", function(event){
            $(this).parents(".time-wrapper").find(".timepickerInput").attr("value", "");
            $(this).parents(".timeSelect-wrapper").find(".hour").html("00");
            $(this).parents(".timeSelect-wrapper").find(".min").html("00");
            $(this).parents(".timeSelect-wrapper").find(".amPM").html("AM");
            $(this).parents(".timeSelect-wrapper").find("td").removeClass("selectedTime");
            $("#am-" + id).addClass("selectedTime");
            $(this).parents(".timeSelect-wrapper").slideToggle(300);
        });
    };
    
    originalTime.okClick = function(id){
        $(".okClick").on("click", function(event){
            let timeSelectDiv = $(this).parents(".timeSelect-wrapper"),
                hour = timeSelectDiv.find(".hour"),
                min = timeSelectDiv.find(".min"),
                noon = timeSelectDiv.find(".amPM"),
                inputDiv = $(this).parents(".time-wrapper").find(".timepickerInput");
            console.log(hour, min, noon);
            if (hour.html() === "00" || noon.html() === "00"){
                $(this).parents(".time-wrapper").find(".timepickerInput").attr("value", "");
                hour.html("00");
                min.html("00");
                noon.html("AM");
                $("#am-" + id).addClass("selectedTime");
                timeSelectDiv.find("td").removeClass("selectedTime");
                timeSelectDiv.slideToggle(300);
                inputDiv.attr("value", "");
            } else {
                if (min.html() === "00"){
                    $("#num-0-" + id).addClass("selectedTime");
                }
                timeSelectDiv.slideToggle(300);
            }

        });
    };

    return originalTime;

})(Time || {});