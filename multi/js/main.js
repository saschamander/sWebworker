//Define worker & progress bar
var workerArray = new Array();
var result = 0;
var i = 0;
var zahl;
var count;

function initWorker() {
    //Script übergeben
    var worker = new Worker('js/worker.js');
    //onMessage - Event
    worker.addEventListener('message', function(e) {
        // Get data and progress bar 
        var data = e.data;
        var progressBar = $("#progressBar" + (data.id));
        var label = $("#label" + (data.id));

        // Updating progress bar
        if (typeof data.percent != 'undefined') {
            progressBar.css("width", data.percent + "%");
            progressBar.html(data.percent + "%");
            label.find(".progress" + (data.id)).html(data.percent + "%");            
        }

        // When worker finished
        if (data.sum != '' && data.sum != null && typeof data.sum != 'undefined') {
            progressBar.toggleClass('progress-bar-success');
            label.toggleClass('label-primary');
            label.toggleClass('label-success');
            result += data.sum;
            workerArray[i][0] = false;
            i++;
        }

        // All worker finished
        if (i == count) {
            result += zahl;
            stoptimer();
            appendAlert(0, "Compeleted the task with <b>" + count + "</b> core(s) in <b>" + getTime() + "</b>sec. Sum: <b>" + result + "</b>");
            resettimer()
            i = 0;
            result = 0;
            count = 0;
        }
    }, false);

    return worker;
}

function startWorker() {
    if (stillWorking()) {
        appendAlert(1, "Webworker(s) is/are still running!");
    } else {
            var potenz = document.getElementById("potenz").value;
            count = document.getElementById("cores").value;
            if (count > 9) {
                count = 8;
                appendAlert(1, "Your processor can't have more than 8 core's. The number of cores is reduced to 8.")
            }
            startWork(potenz);
    }
}

function startWork(potenz){
    zahl = Math.pow(2, potenz);
    var temp = (zahl / count);
    resetProgress();

    // Die Potenz aus dem Input Feld holen und an den Worker übergeben.

    for (var i = 0; i < count; i++) {
        workerArray[i] = initWorker();
        appendProgressBar(i);
        workerArray[i].postMessage({"id": i, 'start': temp * i, 'end': temp * (i + 1)});
        workerArray[i][0] = true;
        starttimer();
        //console.log('Worker:'+ i + "\nStart:\t"+temp*i+"\nEnd:\t"+temp * (i + 1));
    }
    appendAlert(3, count + " Webworker started.");
}

function stopWorker() {
    console.log("Webworker terminated!")
    for (var i = 0; i < count; i++) {
        workerArray[i].terminate();
        resetProgress();
        resettimer()
    }
    appendAlert(2, count + " Webworker terminated.");
    count = 0;
}

function resetProgress() {
    $("#progressBars").empty();
}

function clearMsgs() {
    $("#msg").empty();
}

function appendAlert(mode, msg) {
    var msgDiv = '<div class="alert alert-dismissible';

    switch (mode) {
        case 0:
            msgDiv += ' alert-success';
            break;
        case 1:
            msgDiv += ' alert-warning';
            break;
        case 2:
            msgDiv += ' alert-danger';
            break;
        case 3:
            msgDiv += ' alert-info';
            break;
    }
    msgDiv += '" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
    msgDiv += msg;
    msgDiv += '</div>';
    $("#msg").prepend(msgDiv);
}

function appendProgressBar(id) {
    $("#progressBars").append('<span id="label' + id + '" class="label label-primary">Webworker Nr: ' + (id + 1) + ' (<span class="progress'+ (id) + '"></span>)</span><div class="progress"><div id="progressBar' + id + '" class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuemin="0" aria-valuemax="100"></div></div>');
}

function toggleProgressBars() {
    $(".progress").toggle();
    $(".label").toggleClass("progressHidden");
}

function stillWorking() {
    var processRunning = false;
    for (var i = 0; i < count; i++) {
        if (workerArray[i][0] == true) {
            processRunning = true;
            break;
        } 
    }
    return processRunning;
}