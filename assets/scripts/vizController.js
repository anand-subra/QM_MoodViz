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
$(".controls").show();
$(".content").show();
var controlView = "yes";
$(document).keydown(function(evt) {
  if (evt.keyCode == 32) {
    if(controlView == "yes"){
      $(".content").hide();
      $(".controls").hide();
      controlView = "no";
    }
    else{
      $(".controls").show();
      $(".content").show();
      controlView = "yes";
    }
  }
});
