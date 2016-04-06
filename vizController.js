//Determine colour scheme to use
var type = $('#colourScheme').val();
$('#displayColourScheme').text(type);

$("#colourScheme").change(function(){
  type = this.value;
  c = colourS(type);
  $('#displayColourScheme').text(type);

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


//Determine cycle speed
var confSwitch = $('#confetti').val();

$("#confetti").change(function(){
  confSwitch = this.value;
  coffettiSwitch(confSwitch);
})

$(".controls").hide();
var controlView = "yes";

$(function() {
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
});
