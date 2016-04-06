// A simple Particle class
var Confetti = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-10, 10), random(-10, 10));
  this.position = position.copy();
  this.lifespan = 150.0;
};

Confetti.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Confetti.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 1;
};

// Method to display
Confetti.prototype.display = function() {
  noStroke();
  fill(c, this.lifespan);
  ellipse(this.position.x, this.position.y, 5, 5);
};

// Is the particle still useful?
Confetti.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ConfettiEmitter = function(position) {
  this.origin = position.copy();
  this.confettis = [];
};

ConfettiEmitter.prototype.addConfetti = function() {
  this.confettis.push(new Confetti(this.origin));
};

ConfettiEmitter.prototype.run = function() {
  for (var i = this.confettis.length-1; i >= 0; i--) {
    var p = this.confettis[i];
    p.run();
    if (p.isDead()) {
      this.confettis.splice(i, 1);
    }
  }
};
