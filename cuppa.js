var Time = 210000;
var TimerStep = 100;
var TimerIsFlag = false;

$(document).ready(function(){
    init();
});

function init(){
    Time = 210000;
    TimerIsFlag = false;
    updateTime(Time);

    startTimer();
}

function updateTime(time){
    var milliseconds = (time%1000)/10;
    var seconds = Math.floor((time/1000)%60);
    var minutes = Math.floor((time/1000)/60);
    $("#minute_display").text(minutes);
    $("#second_display").text(seconds);
    $("#millisec_display").text(milliseconds)
}

function startTimer(){
    TimerIsFlag = true;
    var timer = setInterval(function(){timerFunction()}, TimerStep);
}

function timerFunction(){
    Time -= TimerStep;
    if (Time<=0){

    }else{
        updateTime(Time);
    }
}
