
var sensitivitySlider = document.getElementById("sensitivityRange");
var sensitivityOutput = document.getElementById("demo1");
var timesSlider = document.getElementById("timesRange");
var timesOutput = document.getElementById("demo2");
var secSlider = document.getElementById("secRange");
var secOutput = document.getElementById("demo3");

sensitivityOutput.innerHTML = sensitivitySlider.value;
timesOutput.innerHTML = timesSlider.value;
secOutput.innerHTML = secSlider.value;

sensitivitySlider.oninput = function() {
  sensitivityOutput.innerHTML = this.value;
}
timesSlider.oninput = function() {
  timesOutput.innerHTML = this.value;
}
secSlider.oninput = function() {
  secOutput.innerHTML = this.value;
}

function hideSettings() {
  var x = document.getElementById("settings");
  var defaultButton = document.getElementById("defaultButton");
  if (x.style.display === "none") {
    x.style.display = "block";
    defaultButton.style.display = "inline";
  } else {
    x.style.display = "none";
    defaultButton.style.display = "none";
  }
}

function setDefault(){
  sensitivitySlider.value = 30;
  sensitivityOutput.innerHTML = 30;
  timesSlider.value = 4;
  timesOutput.innerHTML = 4;
  secSlider.value = 10;
  secOutput.innerHTML = 10;
}

function closeExplanation(){
  document.getElementById('explanation_overlay').style.display = "none";
}

function openExplanation(){
  document.getElementById('explanation_overlay').style.display = "block";
}

