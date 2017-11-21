var Time = (function(originalTime){
    
    originalTime.firstClick = function(){
        $(".timeClick").on("click", function(event){
            console.log($(this));
            let inputValue = $(this).html(),
                parentTable = $(this).parents("table"),
                inputDiv = $(this).parents(".time-wrapper").find(".timepickerInput"),
                hour = $(this).parents(".timeSelect-wrapper").find(".hour").html(),
                min = $(this).parents(".timeSelect-wrapper").find(".min").html(),
                noon = $(this).parents(".timeSelect-wrapper").find(".amPM").html();
                
            noon = noon === "00" ? "" : $(this).parents(".timeSelect-wrapper").find(".amPM").html()
            console.log(hour, min, noon);
            if (parentTable.hasClass("hourTable")){
                console.log("has hourTable class");
                hour = inputValue;
                inputDiv.attr("value", hour + ":" + min + " " + noon);
                $(this).parents(".timeSelect-wrapper").find(".hour").html(hour);
                $(this).parents(".timeSelect-wrapper").find(".hour").data('selected', true);
                $(this).addClass("selectedTime");
            }
            if (parentTable.hasClass("minTable")){
                min = inputValue;
                console.log("has minTable class");
                inputDiv.attr("value", hour + ":" + min + " " + noon);
                $(this).parents(".timeSelect-wrapper").find(".min").html(min);
                $(this).parents(".timeSelect-wrapper").find(".min").data('selected', true);
                $(this).addClass("selectedTime");
            }
            if (parentTable.hasClass("amPMTable")){
                noon = inputValue;
                console.log("has amPM class");
                inputDiv.attr("value", hour + ":" + min + " " + noon);
                $(this).parents(".timeSelect-wrapper").find(".amPM").html(noon);
                $(this).parents(".timeSelect-wrapper").find(".amPM").data('selected', true);
                $(this).addClass("selectedTime");
            }
            
            let hourSelected = $(this).parents(".timeSelect-wrapper").find(".hour").data('selected'),
                minSelected = $(this).parents(".timeSelect-wrapper").find(".min").data('selected'),
                noonSelected = $(this).parents(".timeSelect-wrapper").find(".amPM").data('selected');
            
            console.log(hourSelected);
            
            if (hourSelected === true && minSelected === true && noonSelected === true){
                $(this).parents(".timeSelect-wrapper").toggle();
            }

            //originalTime.secondClick(inputValue);
        });
    };

    return originalTime;

})(Time || {});