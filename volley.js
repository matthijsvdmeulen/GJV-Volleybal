fetchData();
counter();
setTimeout(displayTeams, 500);

function fetchData() {
    var now = new Date().getTime();
    fetch("counter.txt?t=" + now)
        .then(response => response.text())
        .then(text => {
            sessionStorage.setItem("storeCounter", text);
        });
    fetch("ronde.txt?t=" + now)
        .then(response => response.text())
        .then(text => {
            sessionStorage.setItem("ronde", text);
        });
    fetch("wedstrijdschema.txt?t=" + now)
        .then(response => response.text())
        .then(text => {
            sessionStorage.setItem("storeWedstrijdschema", text);
        });

    setTimeout(fetchData, 1000);
}

var audio = new Audio("alarm.mp3");

function counter() {
    //var data = document.getElementById("storeCounter").innerHTML;
    var data = sessionStorage.getItem("storeCounter");
    var countDownDate = new Date(data).getTime();
    
    var now = new Date().getTime();

    var distance = countDownDate - now;
    
    // var hours = Math.floor(((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("counter").innerHTML = pad(minutes) + ":" + pad(seconds);
    
    if (distance > -1000 && distance < 0) {
        document.getElementById("counter").innerHTML = "STOP";
        audio.play();
    }
    if (distance > -30000 && distance <= -1000) {
        document.getElementById("counter").innerHTML = "STOP";
    }
    if (distance < -30000) {
        document.getElementById("counter").innerHTML = "PAUZE";
    }
    setTimeout(counter, 1000);
}

function displayTeams() {
    var ronde = sessionStorage.getItem("ronde");
    document.getElementById("ronde").innerHTML = ronde;
    var schema = cleanData("storeWedstrijdschema");
    document.getElementById("veld1_1").innerHTML = schema[ronde - 1][0];
    document.getElementById("veld1_2").innerHTML = schema[ronde - 1][1];
    document.getElementById("veld2_1").innerHTML = schema[ronde - 1][2];
    document.getElementById("veld2_2").innerHTML = schema[ronde - 1][3];
    setTimeout(displayTeams, 500);
}

function cleanData(element) {
    var dataSRC = sessionStorage.getItem(element);
    var clean = dataSRC.split("\n");
    var data = [];
    for(let i = 0; i < clean.length ; i++) {
        data[i] = clean[i].split("	");
    }
    return data;
}

function pad(num) {
    var s = "0" + num;
    return s.substr(s.length-2);
}