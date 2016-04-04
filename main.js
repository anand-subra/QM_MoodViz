//Variables for p5.Main and lissajous processes
var centerX = $(window).width()/2,
centerY = $(window).height()/2,
radius,
angle = 0,
speed = 0.5,
x, y, sizePath,
windowHeight = $(window).height(),
windowWidth = $(window).width(), c;



//Variables for p5.Sound processes
var mySound, amplitude, beat, ellipseWidth;


function preload(){
  mySound = loadSound('assets/audio/FatherStretchMyHandsKanyeWest.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  amplitude = new p5.Amplitude();
  textAlign(CENTER);
  mySound.setVolume(0.8);
  fft = new p5.FFT();
  beat = new p5.PeakDetect();
  smooth();
  c = color(random(75,255), random(75,255), random(75,255), 200);
}


function draw() {
  //Add semi-transparent rectangle on every run of draw, creates fading effect
  noStroke();
  fill(0, 0, 0, 10);
  rect(0, 0, windowWidth, windowHeight);

  //get amplitude and map to ellipse radius variable
  var level = amplitude.getLevel();
  sizePath = map(level, 0, 1, 0, 300);
  radius = sizePath * 3;

  //lissajous drawing
  //fill(255, 75, 75, 150); the nice red colour
  fill(c);
  x = centerX + cos(angle)*radius;
  y = centerY + sin(angle)*radius;
  noStroke();
  newRadius = sizePath * sin(frameCount * 0.05); //
  ellipse(x, y, newRadius, newRadius);
  angle += speed;


  fft.analyze();
  beat.update(fft);

  //if beat is detected, randomly change the color of the ellipses
  if (beat.isDetected) {
    c = color(random(75,255), random(75,255), random(75,255), 200);
  }
  //document.getElementById("audio-data").innerHTML = "Level: " + sizePath;

}//end of draw



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
