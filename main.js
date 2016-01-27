var centerX = $(window).width()/2,
    centerY = $(window).height()/2,
    radius = 100,
    angle = 0,
    speed = 0.01,
    x, y;

var mySound, amplitude;
var songNow;
var songDur;


function preload(){
  mySound = loadSound('assets/HelloAdele.mp3');
}


function setup() {
  createCanvas($(window).width(), $(window).height()-300);
  amplitude = new p5.Amplitude();
  frameRate(60);
  textAlign(CENTER);
  mySound.setVolume(0.5);
  fft = new p5.FFT();
  fft.smooth(1.0);
}



function draw() {
  //animate ellipse into lissajous curve + set size to amplitude
  background(0);
  x = centerX + cos(angle)*radius;
  y = centerY + sin(angle)*radius;
  var level = amplitude.getLevel();
  var size = map(level, 0, 1, 0, 700);
  var sizeFill = size * 255;
  fill(sizeFill, 75, 75);
  noStroke();
  ellipse(x, y, size, size);
  angle += speed;

  //draw waveform
  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(78,205,196); // waveform is red
  strokeWeight(2);
  for (var i = 0; i< waveform.length; i++){
    var xW = map(i, 0, waveform.length, 0, width);
    var yW = map( waveform[i], -1, 1, 0, height);
    vertex(xW,yW);
  }
  endShape();

  //round currentTime + duration
  fill(255,107,107);
  noStroke();
  textSize(14);
  songNow = mySound.currentTime();
  songDur = mySound.duration();
  textFont("Helvetica");
  text(nfc(songNow,2), width-150, 35);
  text(nfc(songDur,2), $(window).width()-25, 35);

  stroke(255);
  line(width-125, 30, width-55, 30);
  var playhead = map(songNow, 0, songDur, width-125, width-55);
  noStroke();
  ellipse(playhead, 30, 10, 10);


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
