fetchData();
setTimeout(counter, 1000);

function fetchData() {
    var now = new Date().getTime();
    fetch("./control/api.php?t=" + now)
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem("db", JSON.stringify(json));
        }).
        then(() => displayTeams());
    setTimeout(fetchData, 1000);
}

var audio = new Audio("alarm.mp3");

function counter() {
    var db = sessionStorage.getItem("db");
    var countdown = JSON.parse(db).counter;

    var now = new Date().getTime();

    var distance = countdown - now;

    // var hours = Math.floor(((distance % (1000 * 60 * 60 * 24)) / (60 * 60)));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / 60 / 1000);
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("counter").innerHTML = pad(minutes) + ":" + pad(seconds);

    if (distance > -1000 && distance <= 0) {
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
    var db = JSON.parse(sessionStorage.getItem("db"));
    var ronde = db.ronde;
    var schema = db.wedstrijdschema;
    var rondeLabel = document.getElementById("rondelabel");
    if(ronde == db.wedstrijdschema.length-1) {
        rondeLabel.innerHTML = "Halve Finale";
    } else if(ronde == db.wedstrijdschema.length) {
        rondeLabel.innerHTML = "Finale";
    } else if(ronde <= 0) {
        rondeLabel.innerHTML = "Ronde: -";
        schema = [["-","-","-","-"]];
        ronde = 1;
    } else {
        rondeLabel.innerHTML = `Ronde: <span id="ronde">${ronde}</span>`;
        // document.getElementById("ronde").innerHTML = ronde;
    }


    document.getElementById("veld1_1").innerHTML = schema[ronde - 1][0];
    document.getElementById("veld1_2").innerHTML = schema[ronde - 1][1];
    document.getElementById("veld2_1").innerHTML = schema[ronde - 1][2];
    document.getElementById("veld2_2").innerHTML = schema[ronde - 1][3];
}



function pad(num) {
    var s = "0" + num;
    return s.substr(s.length-2);
}