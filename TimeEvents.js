var Time = (function(originalTime){

    let secondClick = [0, 1, 2],
        thirdClick = [0, 1, 2, 3, 4, 5],
        fourthClick = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    originalTime.firstClick = function(){
        $(".timeClick").on("click", function(event){
            console.log($(this));
            let hour1 = $(this).html(),
                inputDiv = $(this).parents(".time-wrapper").find(".datepickerInput");
            inputDiv.attr("value", hour1 + "0:00");

            let tds = $(this).parents("table").find("td");

            for (let j = 0; j < tds.length; j++){
                for (var i = 0; i < secondClick.length; i++){
                    if (tds[j].innerHTML == secondClick[i]){
                        $(tds[j]).removeClass("grey");
                        $(tds[j]).addClass("timeClick");
                    }
                }
            }

            originalTime.secondClick(hour1);
        });
    };

    originalTime.secondClick = function(hour1){
        $(".timeClick").unbind();
        $(".timeClick").on("click", function(event){
            let hour2 = $(this).html(),
                inputDiv = $(this).parents(".time-wrapper").find(".datepickerInput");
            inputDiv.attr("value", hour1 + hour2 + ":00");

            let tds = $(this).parents("table").find("td")

            for (let j = 0; j < tds.length; j++){
                console.log(tds[j].innerHTML);
                for (var i = 0; i < thirdClick.length; i++){
                    if (tds[j].innerHTML == thirdClick[i]){
                        $(tds[j]).removeClass("grey");
                        $(tds[j]).addClass("timeClick");
                    }
                }
            }

            originalTime.thirdClick(hour1, hour2);
        });
    };

    originalTime.thirdClick = function(hour1, hour2){
        $(".timeClick").unbind();
        $(".timeClick").on("click", function(event){
            let hour3 = $(this).html(),
                inputDiv = $(this).parents(".time-wrapper").find(".datepickerInput");
            inputDiv.attr("value", hour1 + hour2 + ":" + hour3 + "0");

            let tds = $(this).parents("table").find("td");

            for (let j = 0; j < tds.length; j++){
                for (var i = 0; i < fourthClick.length; i++){
                    if (tds[j].innerHTML == fourthClick[i]){
                        $(tds[j]).removeClass("grey");
                        $(tds[j]).addClass("timeClick");
                    }
                }
            }

            originalTime.fourthClick(hour1, hour2, hour3);
        });
    };

    originalTime.fourthClick = function(hour1, hour2, hour3){
        $(".timeClick").unbind();
        $(".timeClick").on("click", function(event){
            let hour4 = $(this).html(),
                inputDiv = $(this).parents(".time-wrapper").find(".datepickerInput");
            inputDiv.attr("value", hour1 + hour2 + ":" + hour3 + hour4);

            let timeSelectWrapper = $(this).parents(".timeSelect-wrapper")
            console.log(timeSelectWrapper);
            timeSelectWrapper.empty();
            timeSelectWrapper.append("<div class='text-center amPM'><span class='am timeClick pointer'>AM</span>/<span class='pm timeClick pointer'>PM</span></div>")

            originalTime.fifthClick(hour1, hour2, hour3, hour4);
        });
    };

    originalTime.fifthClick = function(hour1, hour2, hour3, hour4){
        $(".timeClick").unbind();
        $(".timeClick").on("click", function(event){
            let amPM = $(this).html(),
                inputDiv = $(this).parents(".time-wrapper").find(".datepickerInput");
            inputDiv.attr("value", hour1 + hour2 + ":" + hour3 + hour4 + " " + amPM);

            let timeSelectWrapper = $(this).parents(".timeSelect-wrapper")
            console.log(timeSelectWrapper);
            timeSelectWrapper.empty();
            timeSelectWrapper.toggle();
            $(".timeClick").unbind();
        });
    };



    return originalTime;

})(Time || {});