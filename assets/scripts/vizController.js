// Determine colour scheme to use
var type = $('#colourScheme').val();
$('#displayColourScheme').text(type);

$("#colourScheme").change(function(){
  type = this.value;
  c = changeColour(type, EDAvalue);
  $('#displayColourScheme').text(type);
})


// Determine frame rate, based on machine performance capabilites
var fr = $('#framesPerSecond').val();

$("#framesPerSecond").change(function(){
  fr = parseInt(this.value);
  setFrameRate(fr);
})


// Determine geometry complexity, based on machine performance capabilites
var geomC = $('#geomComplexity').val();

$("#geomComplexity").change(function(){
  geomC = parseInt(this.value);
  setGeomComplexity(geomC);
})


// Determine cycle speed
var cycSpeed = $('#cycleSpeed').val();

$("#cycleSpeed").change(function(){
  cycSpeed = parseFloat(this.value);
  setCycleSpeed(cycSpeed);
})


// Determine cycle speed
var confSwitch = $('#confetti').val();

$("#confetti").change(function(){
  confSwitch = this.value;
  coffettiSwitch(confSwitch);
})


// Toggle 'space' to display debug/customization menu
$(".controls").hide();
var controlView = "no";
$(document).keydown(function(evt) {
  if (evt.keyCode == 32) {
    if(controlView == "yes"){
      $(".controls").hide();
      controlView = "no";
    }
    else{
      $(".controls").show();
      controlView = "yes";
    }
  }
});


//Mouse movement enables all UI to show - after 3 seconds of no movement, only visualisation remains
function hideContent() {
   $(".content").hide();
}
$(document).mousemove(function(evt) {
  $(".content").show();
  setTimeout(hideContent, 3000);
});
