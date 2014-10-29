var Time = 210000;
var Time_start = 210000;
var TimerStep = 100;
var timer = {};
var TimerIsOnFlag = false;
var KnobIsOnFlag = false;
var TeaReadySound = {};

$(document).ready(function(){
    $(".TimerKnob").hide();
    $(".TeaReady").hide();
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
    TeaReadySound = new Audio('sounds/tea-ready.mp3');
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
    $(".TeaReady").hide();
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
    $("#millisec_display").text(milliseconds);
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
    $(".TimerKnob").hide();
    $(".Timer").show();
    $(".TeaReady").hide();
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
    $(".TimerKnob").hide();
    $(".Timer").show();
    $(".TeaReady").hide();
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
    if (Time==0){
        teaIsReady(0);
    }else if(Time==-60000){
        teaIsReady(1);
    }else if(Time==-120000){
        teaIsReady(2);
    }else{
        updateTime(Time);
    }
}

function teaIsReady(mode){
    if(mode==0){
        TeaReadySound.play();
        $(".TeaReady").text("Your perfect cuppa is ready");
    }else if(mode==1){
        TeaReadySound.play();
        $(".TeaReady").text("Don't wait too long!");
    }else if(mode==2){
        TeaReadySound.play();
        $(".TeaReady").text("Happy tea time");
        clearInterval(timer);
    }
    $(".TeaReady").show();
    $(".Timer").hide();
    $(".TimerKnob").hide();
}
