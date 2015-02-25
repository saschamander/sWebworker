var millisec = 0;
var seconds = 0;
var timer;

function display() {
    if (millisec >= 9) {
        millisec = 0
        seconds += 1
    }
    else
        millisec += 1
    
    timer = setTimeout("display()", 100);
}

function getTime(){
    return seconds + "." + millisec;
}

function starttimer() {
    if (timer > 0) {
        return;
    }
    display();
}
function stoptimer() {
    clearTimeout(timer);
    timer = 0;
}

function resettimer() {
    stoptimer();
    millisec = 0;
    seconds = 0;
}
