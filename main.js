//Variables for p5.Main and lissajous processes
var centerX = $(window).width()/2,
    centerY = $(window).height()/2,
    radius = 300,
    angle = 0,
    speed = 0.02,
    x, y, size;



//Variables for p5.Sound processes

var mySound, amplitude;
var songNow;
var songDur;


function preload(){
  mySound = loadSound('assets/audio/HelloAdele.mp3');
}


function setup() {
  createCanvas($(window).width(), $(window).height());
  amplitude = new p5.Amplitude();
  textAlign(CENTER);
  mySound.setVolume(0.5);
  fft = new p5.FFT();
  fft.smooth(1.0);
}


function draw() {
  //animate ellipse into lissajous curve + set size to amplitude
  background(0);
  var level = amplitude.getLevel();
  size = map(level, 0, 1, 0, 1000);


  var spectrum = fft.analyze();




  document.getElementById("audio-data").innerHTML = "Level: " + level + " Spectrum: " + spectrum;

  var sizeFill = size * 255;
  fill(sizeFill, 75, 75);
  noStroke();
  x = centerX + cos(angle)*radius;
  y = centerY + sin(angle)*radius;
  ellipse(x, y, size, size);
  angle += speed;

  //draw waveform
  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(41,47,54); // waveform is grey-blue
  strokeWeight(2);
  for (var i = 0; i< waveform.length; i++){
    var xW = map(i, 0, waveform.length, 0, width);
    var yW = map( waveform[i], -1, 1, 0, height);
    vertex(xW,yW);
  }
  endShape();
}


function keyPressed() {
//pause-play functionality
  if (keyCode == RETURN && mySound.isPlaying())
  {
    mySound.pause();
  }
  else if ((keyCode == RETURN && !mySound.isPaused()) || (keyCode == ENTER && !mySound.isPlaying()) )
  {
    mySound.play();
  }

//stop functionality
  if (keyCode == ESCAPE)
  {
    if(mySound.isPlaying() )
    {
      mySound.stop();
    }
  }

//seek functionality +/- 15secs
  if (keyCode == RIGHT_ARROW)
  {
    mySound.jump(songNow+5);
  }
  if (keyCode == LEFT_ARROW)
  {
    mySound.jump(songNow-5);
  }

  return false;

}
