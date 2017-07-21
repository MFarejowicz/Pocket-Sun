var bg
var sun
var lions = []
var menu
var menuActive = false
var pause = false
var gameOver
var gameOverActive = false
var spawnRate = 4 //decrease to increase spawn
var lionLimit = 200

function setup() {
  // bg = loadImage("../static/img/space.jpg")
  var gameCanvas = createCanvas(800, 800)
  gameCanvas.parent("gameContainer")
  sun = new Sun()
  menu = new Menu()
  gameOver = new GameOver()
}

function draw() {
  background(0)
  if (this.menuActive) {
    menu.show(sun)
  }
  // else if (this.gameOverActive) {
  //   gameOver.show()
  // }
  else if (this.pause){
    for (let i = lions.length-1; i >=0; i--){
      lions[i].show()
    }
    sun.show()
  }
  else {
    this.move()
    if (frameCount % this.spawnRate == 0 && lions.length < this.lionLimit) {
      lions.push(new Lion())
    }
    for (let i = lions.length-1; i >= 0; i--) {
      lions[i].show()
      lions[i].update(sun)
      if (lions[i].hits(sun)){
        lions.splice(i,1)
        sun.heal()
      }
    }
    sun.show()
    sun.update()
    // if (sun.health <= 0) {
    //   gameOverActive = true
    // }
  }
}

function keyPressed() {
  if (keyCode === 69 && !this.menuActive){
    this.menuActive = true
  }
  else if (keyCode === 69 && this.menuActive){
    this.menuActive = false
  }
  else if (keyCode === 49 && this.menuActive) {
    menu.upsize(sun)
  }
  else if (keyCode == 81 && !this.pause){
    this.pause = true
  }
  else if (keyCode == 81 && this.pause) {
    this.pause = false
  }
}

function move() {
  if (keyIsDown(87) && keyIsDown(65)) {
    sun.moveUpLeft()
  } else if (keyIsDown(87) && keyIsDown(68)) {
    sun.moveUpRight()
  } else if (keyIsDown(83) && keyIsDown(65)) {
    sun.moveDownLeft()
  } else if (keyIsDown(83) && keyIsDown(68)) {
    sun.moveDownRight()
  } else if (keyIsDown(87)) {
    sun.moveUp()
  } else if (keyIsDown(83)) {
    sun.moveDown()
  } else if (keyIsDown(68)) {
    sun.moveRight()
  } else if (keyIsDown(65)) {
    sun.moveLeft()
  }
}

function Menu() {
  this.sizeCost = 25

  this.show = function(sun) {
    fill(255)
    rect(0,0,799,799)
    fill(255,0,0)
    text("Lion Limit", 30, 60)
    text(lionLimit, 200, 60)
    text("Sun size", 30, 120)
    text(sun.radius, 200, 120)
    text(this.sizeCost, 300, 120)
    text(sun.kills, 750, 60)
  }
  this.upsize = function(sun){
    if (sun.kills >= this.sizeCost){
      sun.radius += 20
      sun.kills -= this.sizeCost
      this.sizeCost += 25
    }
  }
}

function GameOver() {

  this.show = function(){
    fill(255)
    rect(0,0,799,799)
    fill(255,0,0)
    text("GAME OVER", 350, 350)
    text("Refresh to restart", 350, 450)
  }
}
