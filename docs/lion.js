function Lion() {
  this.x = random(width)
  this.y = random(height)
  
  this.show = function() {
    fill(255)
    ellipse(this.x, this.y, 15, 15)
  }
}
