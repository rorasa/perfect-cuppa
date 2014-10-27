var Time = 210000;
var Time_start = 210000;
var TimerStep = 100;
var timer = {};
var TimerIsOnFlag = false;
var KnobIsOnFlag = false;

$(document).ready(function(){
    $(".TimerKnob").hide();

    init();

    $(".MainButton").click(function(){
        if(TimerIsOnFlag){ resetTimer(); }
        else{ startTimer(); }
    });
    $(".SetTimeButton").click(function(){
        if(KnobIsOnFlag){ setTime(); }
        else{ loadTime(Time); }
    });
    $("#time-knob-mm").keyup(function(){
        checkKnob($("#time-knob-mm"));
    });
    $("#time-knob-ss").keyup(function(){
        checkKnob($("#time-knob-ss"));
    });
});

function init(){
    Time = 210000;
    Time_start = 210000;
    TimerIsOnFlag = false;
    KnobIsOnFlag = false;
    updateTime(Time);
}

function loadTime(time){
    KnobIsOnFlag = true;
    $(".TimerKnob").toggle();
    $(".Timer").toggle();
    var seconds = Math.floor((time/1000)%60);
    var minutes = Math.floor((time/1000)/60);
    $("#time-knob-mm").val(minutes);
    $("#time-knob-ss").val(seconds);
}

function setTime(){
    KnobIsOnFlag = false;
    $(".TimerKnob").toggle();
    $(".Timer").toggle();
    if(checkKnob($("#time-knob-mm"))&&checkKnob($("#time-knob-ss"))){
        var minutes = parseInt($("#time-knob-mm").val());
        var seconds = parseInt($("#time-knob-ss").val());
        Time = ((minutes*60)+seconds)*1000;
        updateTime(Time);
        return true;
    }else{
        loadTime(Time);
        updateTime(Time);
        return false;
    }
}

function updateTime(time){
    var milliseconds = (time%1000)/10;
    var seconds = Math.floor((time/1000)%60);
    var minutes = Math.floor((time/1000)/60);
    $("#minute_display").text(minutes);
    $("#second_display").text(seconds);
    $("#millisec_display").text(milliseconds)
}

function checkKnob(input){
    var minutes = parseInt(input.val());
    if(isNaN(minutes)){
        input.css("color","red");
        return false;
    }else{
        input.css("color","black");
        return true;
    }
}

function startTimer(){
    if(KnobIsOnFlag){
        if(!setTime()){
            return;
        }
    }
    // start timer and set timer flag
    TimerIsOnFlag = true;
    Time_start = Time;
    timer = setInterval(function(){timerFunction()}, TimerStep);
    // change button to reset
    $(".MainButton").text("RESET");
    $(".MainButton").toggleClass("btn-primary");
    $(".MainButton").toggleClass("btn-danger");
    $(".SetTimeButton").attr("disabled","disabled");
}

function resetTimer(){
    // stop timer, reset flag, reset time
    TimerIsOnFlag = false;
    Time = Time_start;
    clearInterval(timer);
    updateTime(Time)
    // change button to start
    $(".MainButton").text("START");
    $(".MainButton").toggleClass("btn-primary");
    $(".MainButton").toggleClass("btn-danger");
    $(".SetTimeButton").removeAttr("disabled");
}

function timerFunction(){
    Time -= TimerStep;
    if (Time<=0){

    }else{
        updateTime(Time);
    }
}
