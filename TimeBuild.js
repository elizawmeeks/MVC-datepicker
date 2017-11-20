var Time = (function(originalTime){
    
    originalTime.beginSequence = function(id){
        Time.firstClick(id);
    };

    return originalTime;

})(Time || {});