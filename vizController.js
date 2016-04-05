//Determine colour scheme to use
var type = $('#colourScheme').val();

$("#colourScheme").change(function(){
  type = this.value;
  c = colourS(type);
})


//Determine frame rate, based on machine performance capabilites
var fr = $('#framesPerSecond').val();

$("#framesPerSecond").change(function(){
  fr = parseInt(this.value);
  setFrameRate(fr);
})


//Determine geometry complexity, based on machine performance capabilites
var geomC = $('#geomComplexity').val();

$("#geomComplexity").change(function(){
  geomC = parseInt(this.value);
  setGeomComplexity(geomC);
})


//Determine cycle speed
var cycSpeed = $('#cycleSpeed').val();

$("#cycleSpeed").change(function(){
  cycSpeed = parseFloat(this.value);
  setCycleSpeed(cycSpeed);
})


$(window).keypress(function(e) {
    if (e.which === 32) {
        alert("hello");
    }
});
