var index = 0;
fetchData();
counter();
setTimeout(displayTeams, 500)
setTimeout(slider, 500)

function fetchData() {
    var now = new Date().getTime();
	fetch('counter.txt?t=' + now)
		.then(response => response.text())
		.then(text => {
			document.getElementById("storeCounter").innerHTML = text
		})
    /*    
    fetch('ronde.txt?t=' + now)
		.then(response => response.text())
		.then(text => {
			document.getElementById("ronde").innerHTML = text
		})
    */
    fetch('wedstrijdschema.txt?t=' + now)
		.then(response => response.text())
		.then(text => {
			document.getElementById("storeWedstrijdschema").innerHTML = text
		})

	setTimeout(fetchData, 1000)
}

var audio = new Audio('alarm.mp3');

function counter() {
  var data = document.getElementById("storeCounter").innerHTML
  var countDownDate = new Date(data).getTime();
  
  var now = new Date().getTime();

  var distance = countDownDate - now;
  
  var hours = Math.floor(((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
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
};
/*
var url = "https://docs.google.com/presentation/d/e/2PACX-1vTERrMRnq1xmEfbCW2tiev6by-d-wU1weKYqPc2xw8MEUMKsC-nP3PXfWvTsX9OU2oesWLRNwVyGqAe/embed?start=true&loop=true&delayms=10000&rm=minimal";

var url2 = "wedstrijdschema.html"

function slider() {
	if(index == 0){
		document.getElementById("pagina").src = url2;
		index++;
	} else if(index == 1) {
		document.getElementById("pagina").src = url2;
		index = 0;
	}
	setTimeout(slider, 5000)
}

function displayTeams() {
    ronde = document.getElementById("ronde").innerHTML
    schema = cleanData("storeWedstrijdschema");
	document.getElementById("veld1_1").innerHTML = schema[ronde - 1][0];
	document.getElementById("veld1_2").innerHTML = schema[ronde - 1][1];
	document.getElementById("veld2_1").innerHTML = schema[ronde - 1][2];
	document.getElementById("veld2_2").innerHTML = schema[ronde - 1][3];
	setTimeout(displayTeams, 500)
}
*/
function cleanData(element) {
	var dataSRC = document.getElementById(element).innerHTML
	var clean = dataSRC.split("\n")
	var data = []
	for(i = 0; i < clean.length ; i++) {
				data[i] = clean[i].split("	")
			}
	return data
}

function pad(num) {
    var s = "0" + num;
    return s.substr(s.length-2);
}