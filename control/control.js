var now = new Date().getTime();

var input = document.getElementById('input')
input.addEventListener('change', function() {
    readXlsxFile(input.files[0]).then(function(rows) {

        var table = document.createElement("table") // Create table header.
        var tr = table.insertRow();

        rows.shift();

        var schema = [];
        var countVeld1 = 0;
        var countVeld2 = 0;
        rows.forEach(row => {
            if(row[2] === "Veld 1") {
                countVeld1++;
                schema.push([row[5], row[6]])
            } else if(row[2] === "Veld 2") {
                countVeld2++;
                if(countVeld1 === countVeld2) {
                    schema[countVeld1-1].push(row[5])
                    schema[countVeld1-1].push(row[6])
                } else {
                    schema.push(["-","-",row[5], row[6]])
                }
            }

        });

        schema.forEach(row => {
            var tr = table.insertRow();
            row.forEach(cell => tr.insertCell().innerText = cell);
        });

        // Finally, add the dynamic table to a container.
        var divContainer = document.getElementById("showTable");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        fetch('./api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams({
                'wedstrijdschema': JSON.stringify(schema),
            })
            .toString()
        })
        .then(response => response.text())
        .then(text => {
            sessionStorage.setItem("db", text);
        })
        .then(() => changeView());
    })
})

fetchData();

function fetchData() {
    var now = new Date().getTime();
    fetch("./api.php?t=" + now)
    .then(response => response.text())
    .then(text => {
        sessionStorage.setItem("db", text);
    });

    // setTimeout(fetchData, 1000);
}

setTimeout(changeView, 500);

function changeView() {
    var db = JSON.parse(sessionStorage.getItem("db"));
    var ronde = document.getElementById("ronde");
    ronde.innerHTML = "";
    ronde.insertAdjacentHTML("beforeend", `<option value="-1">-1</option>`)
    db.wedstrijdschema.forEach((row, index) => {
        ronde.insertAdjacentHTML("beforeend", `<option value="${index+1}">${index+1}</option>`)
    });
    ronde.value = db.ronde;

    document.getElementById("timer").innerText = db.counter;

    // setTimeout(changeView, 300);
}
document.querySelector("#timerStart").addEventListener("click", e => {
    e.preventDefault();
    fetch('./api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams({
            'submit': 'Start',
            'counter': new Date().getTime() + (10 * 60 * 1000)
        })
        .toString()
    })
    .then(response => response.text())
    .then(text => {
        sessionStorage.setItem("db", text);
    })
    .then(() => changeView());;
});

document.querySelector("#rondeMin").addEventListener("click", e => {
    e.preventDefault();
    var db = JSON.parse(sessionStorage.getItem("db"));
    if(db.ronde != 1) {
        fetch('./api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams({
                'ronde': db.ronde-1,
            })
            .toString()
        })
        .then(response => response.text())
        .then(text => {
            sessionStorage.setItem("db", text);
        })
        .then(() => changeView());
    }
});

document.querySelector("#rondePlus").addEventListener("click", e => {
    e.preventDefault();
    var db = JSON.parse(sessionStorage.getItem("db"));
    if(db.ronde < 0) {db.ronde = 0}
    if(db.ronde != db.wedstrijdschema.length) {
        fetch('./api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams({
                'ronde': parseInt(db.ronde) + 1,
            })
            .toString()
        })
        .then(response => response.text())
        .then(text => {
            sessionStorage.setItem("db", text);
        })
        .then(() => changeView());
    }
})

document.querySelector("#ronde").addEventListener("change", e => {
    e.preventDefault();
    var db = JSON.parse(sessionStorage.getItem("db"));
    var value = document.querySelector("#ronde").value;
    fetch('./api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams({
            'ronde': value,
        })
        .toString()
    })
    .then(response => response.text())
    .then(text => {
        sessionStorage.setItem("db", text);
    })
    .then(() => changeView());
})

// import {fetchData} from "../volley.js";

// fetchData();
// counter();
