function Sun() {
  this.y=height/2
  this.x=width/2
  this.show = function(){
    fill(204,102,0)
    ellipse(this.x,this.y,50,50)
  }
  this.moveUp = function() {
    this.y -= 5
  }
  this.moveDown = function() {
    this.y += 5
  }
  this.moveRight = function(){
    this.x += 5
  }
  this.moveLeft = function(){
    this.x -= 5
  }
  this.moveUpLeft = function(){
    this.x -= 3.6
    this.y -= 3.6
  }
  this.moveUpRight = function(){
    this.x += 3.6
    this.y -= 3.6
  }
  this.moveDownLeft = function(){
    this.x -= 3.6
    this.y += 3.6
  }
  this.moveDownRight = function(){
    this.x += 3.6
    this.y += 3.6
  }
}
