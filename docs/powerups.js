function Heal() {
  this.x = random(width)
  this.y = random(height)
  this.radius = 30
  this.change = .3

  this.show = function() {
    fill("lightblue")
    ellipse(this.x, this.y, this.radius)
  }

  this.update = function() {
    this.radius += this.change
    if (this.radius > 35) {
      this.change = -this.change
    } else if (this.radius < 25) {
      this.change = -this.change
    }
  }

  this.activate = function(sun) {
    sun.health = sun.healthCap
  }
}
