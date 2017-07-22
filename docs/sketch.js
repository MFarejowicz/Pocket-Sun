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
var lionRunScale = .9

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
    menu.show(sun,lions)
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
      lions.push(new Lion(lionRunScale))
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
  //add upspawn
  else if (keyCode === 49 && this.menuActive) {
    menu.uplimit()
  }
  else if (keyCode === 50 && this.menuActive) {
    menu.upsize(sun)
  }
  else if (keyCode === 51 && this.menuActive) {
    menu.uphealthcap(sun)
  }
  else if (keyCode === 52 && this.menuActive) {
    menu.upspeed(sun)
  }
  else if (keyCode === 53 && this.menuActive) {
    menu.slowrun(lions)
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
  this.spawnCost = 25
  this.limitCost = 25
  this.sizeCost = 25
  this.healthCapCost = 25
  this.speedCost = 25
  // this.drainCcost = 25
  this.runCost = 25

  this.show = function(sun, lions) {
    fill(255)
    rect(0,0,799,799)
    fill(255,0,0)
    text("Lion spawn rate", 30, 60)
    text("Current: " + map(spawnRate, 4, 0, 1, 10), 250, 60)
    text("Cost: " + this.spawnCost, 500, 60)
    text("Press yeet to upgrade", 50, 95)
    text("Lion limit", 30, 160)
    text("Current: " + lionLimit, 250, 160)
    text("Cost: " + this.limitCost, 500, 160)
    text("Press 1 to upgrade", 50, 195)
    text("Sun size", 30, 260)
    text("Current: " + sun.radius, 250, 260)
    text("Cost: " + this.sizeCost, 500, 260)
    text("Press 2 to upgrade", 50, 295)
    text("Sun health cap", 30, 360)
    text("Current: " + sun.healthCap, 250, 360)
    text("Cost: " + this.healthCapCost, 500, 360)
    text("Press 3 to upgrade", 50, 395)
    text("Sun speed", 30, 460)
    text("Current: " + map(sun.speed, 5, 10, 18, 30), 250, 460)
    text("Cost: " + this.speedCost, 500, 460)
    text("Press 4 to upgrade", 50, 495)
    text("Lion run speed", 30, 560)
    text("Current: " + round(map(lions[0].speed/lionRunScale, 1.3, 2.5, 0, 20)), 250, 560)
    text("Cost: " + this.runCost, 500, 560)
    text("Press 5 to upgrade", 50, 595)
    text("Kills: " + sun.kills, 620, 30)
  }
  this.upspawn = function() {
    if (sun.kills >= this.spawnCost){
      spawnRate -= .5
      sun.kills -= this.spawnCost
      this.spawnCost += 25
    }
  }
  this.uplimit = function(){
    if (sun.kills >= this.limitCost){
      lionLimit += 50
      sun.kills -= this.limitCost
      this.limitCost += 25
    }
  }
  this.upsize = function(sun){
    if (sun.kills >= this.sizeCost){
      sun.radius += 20
      sun.kills -= this.sizeCost
      this.sizeCost += 25
    }
  }
  this.uphealthcap = function(sun){
    if (sun.kills >= this.healthCapCost){
      sun.healthCap += 25
      sun.kills -= this.healthCapCost
      this.healthCapCost += 25
    }
  }
  // this.upheal = function(sun){
  //
  // }
  this.upspeed = function(sun){
    if (sun.kills >= this.speedCost){
      sun.speed += 1
      sun.kills -= this.speedCost
      this.speedCost += 25
    }
  }
  this.slowrun = function(lions){
    if (sun.kills >= this.runCost){
      for (let i = 0; i < lions.length; i ++){
        lions[i].runScale += .1
      }
      lionRunScale += .1
      sun.kills -= this.runCost
      this.runCost += 25
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
