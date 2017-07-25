var bg
var sun
var lions = []
var menu
var menuActive = false
var pause = false
var gameOver
var gameOverActive = false
var bulletsUnlocked = false
var spawnRate = 5 //decrease to increase spawn
var lionLimit = 100
var lionRunScale = .8
var lionSpeed = 2

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
    this.moveandshoot()
    if (frameCount % this.spawnRate == 0 && lions.length < this.lionLimit) {
      lions.push(new Lion(lionSpeed, lionRunScale))
    }
    for (let i = lions.length-1; i >= 0; i--) {
      lions[i].show()
      lions[i].update(sun)
      let impact = lions[i].hits(sun)
      if (impact.hit){
        lions.splice(i,1)
        sun.upkills()
        if (impact.heal) {
          sun.heal()
        }
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
  if (!this.menuActive && keyCode === 69){
    this.menuActive = true
  }
  else if (this.menuActive && keyCode === 69){
    this.menuActive = false
  }
  else if (this.menuActive && keyCode === 49) {
    menu.upsize()
  }
  else if (this.menuActive && keyCode === 50) {
    menu.upspeed()
  }
  else if (this.menuActive &&keyCode === 51) {
    menu.uphealthcap()
  }
  else if (this.menuActive && keyCode === 52) {
    menu.uplimit()
  }
  else if (this.menuActive && keyCode === 53) {
    menu.upspawn()
  }
  else if (this.menuActive && keyCode === 54) {
    menu.slowrun()
  }
  else if (this.menuActive && !this.bulletsUnlocked && keyCode === 55) {
    menu.unlockbullets()
  }
  else if (this.menuActive && this.bulletsUnlocked && keyCode === 56) {
    menu.upfirerate()
  }
  else if (this.menuActive && this.bulletsUnlocked && keyCode === 57) {
    menu.upbulletspeed()
  }
  else if (this.menuActive && this.bulletsUnlocked && keyCode === 48) {
    menu.upbulletsize()
  }
  else if (!this.pause && keyCode == 81){
    this.pause = true
  }
  else if (this.pause && keyCode == 81) {
    this.pause = false
  }
}

function moveandshoot() {
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
  if (bulletsUnlocked && keyIsDown(38)){
    sun.shootUp()
  } else if (bulletsUnlocked && keyIsDown(40)) {
    sun.shootDown()
  } else if (bulletsUnlocked && keyIsDown(39)) {
    sun.shootRight()
  } else if (bulletsUnlocked && keyIsDown(37)) {
    sun.shootLeft()
  }
}

function Menu() {
  this.sizeCost = 25
  this.sizeLevel = 1
  this.speedCost = 25
  this.speedLevel = 1
  this.healthCapCost = 25
  this.healthCapLevel = 1
  this.limitCost = 25
  this.limitLevel = 1
  this.spawnCost = 25
  this.spawnLevel = 1
  this.runCost = 25
  this.runLevel = 1
  this.bulletCost = 1000
  this.fireRateCost = 25
  this.fireRateLevel = 1
  this.bulletSpeedCost = 25
  this.bulletSpeedLevel = 1
  this.bulletSizeCost = 25
  this.bulletSizeLevel = 1

  this.show = function(sun, lions) {
    fill(255)
    rect(0,0,799,799)
    fill(0,132,180)
    textSize(40)
    text("Upgrades!", 30, 50)
    textSize(20)
    text("Kills: " + sun.kills, 620, 30)
    text("Sun size", 30, 140)
    text("Current: " + sun.radius, 250, 140)
    text("Cost: " + this.sizeCost, 500, 140)
    text("Press 1 to upgrade", 50, 160)
    text("Sun speed", 30, 200)
    text("Current: " + map(sun.speed, 5, 10, 18, 30), 250, 200)
    text("Cost: " + this.speedCost, 500, 200)
    text("Press 2 to upgrade", 50, 220)
    text("Sun health cap", 30, 260)
    text("Current: " + sun.healthCap, 250, 260)
    text("Cost: " + this.healthCapCost, 500, 260)
    text("Press 3 to upgrade", 50, 280)
    text("Lion limit", 30, 360)
    text("Current: " + lionLimit, 250, 360)
    text("Cost: " + this.limitCost, 500, 360)
    text("Press 4 to upgrade", 50, 380)
    text("Lion spawn rate", 30, 420)
    text("Current: " + map(spawnRate, 4, 0, 1, 10), 250, 420)
    text("Cost: " + this.spawnCost, 500, 420)
    text("Press 5 to upgrade", 50, 440)
    text("Lion run speed", 30, 480)
    text("Current: " + round(map(lionSpeed/lionRunScale, 1.3, 2.5, 0, 20)), 250, 480)
    text("Cost: " + this.runCost, 500, 480)
    text("Press 6 to upgrade", 50, 500)
    text("Unlock bullets!", 30, 580)
    text("Current: " + (bulletsUnlocked ? "Unlocked" : "Locked"), 250, 580)
    text("Cost: " + this.bulletCost, 500, 580)
    text("Press 7 to upgrade", 50, 600)
    if (bulletsUnlocked) {
      text("Bullet fire rate", 30, 640)
      text("Current: " + sun.fireRate, 250, 640)
      text("Cost: " + this.fireRateCost, 500, 640)
      text("Press 8 to upgrade", 50, 660)
      text("Bullet speed", 30, 700)
      text("Current: " + sun.bulletSpeed, 250, 700)
      text("Cost: " + this.bulletSpeedCost, 500, 700)
      text("Press 9 to upgrade", 50, 720)
      text("Bullet size", 30, 760)
      text("Current: " + sun.bulletSize, 250, 760)
      text("Cost: " + this.bulletSizeCost, 500, 760)
      text("Press 0 to upgrade", 50, 780)
    }
    if (bulletsUnlocked) {
      fill(0,132,180)
      rect(270, 585, 15,25)
    } else {
      noFill()
      rect(270, 585, 15,25)
    }
    for (let i = 1; i <= 10; i++){
      if (i <= this.sizeLevel){
        fill(0,132,180)
        rect(250 + (i*20), 145, 15, 25)
      } else {
        noFill()
        rect(250 + (i*20),145,15,25)
      }
      if (i <= this.speedLevel){
        fill(0,132,180)
        rect(250 + (i*20), 205, 15, 25)
      } else {
        noFill()
        rect(250 + (i*20),205,15,25)
      }
      if (i <= this.healthCapLevel){
        fill(0,132,180)
        rect(250 + (i*20), 265, 15, 25)
      } else {
        noFill()
        rect(250 + (i*20),265,15,25)
      }
      if (i <= this.limitLevel){
        fill(0,132,180)
        rect(250 + (i*20), 365, 15, 25)
      } else {
        noFill()
        rect(250 + (i*20),365,15,25)
      }
      if (i <= this.spawnLevel){
        fill(0,132,180)
        rect(250 + (i*20), 425, 15, 25)
      } else {
        noFill()
        rect(250 + (i*20),425,15,25)
      }
      if (i <= this.runLevel){
        fill(0,132,180)
        rect(250 + (i*20), 485, 15, 25)
      } else {
        noFill()
        rect(250 + (i*20),485,15,25)
      }
      if (bulletsUnlocked) {
        if (i <= this.fireRateLevel){
          fill(0,132,180)
          rect(250 + (i*20), 645, 15, 25)
        } else {
          noFill()
          rect(250 + (i*20),645,15,25)
        }
        if (i <= this.bulletSpeedLevel){
          fill(0,132,180)
          rect(250 + (i*20), 705, 15, 25)
        } else {
          noFill()
          rect(250 + (i*20),705,15,25)
        }
        if (i <= this.bulletSizeLevel){
          fill(0,132,180)
          rect(250 + (i*20), 765, 15, 25)
        } else {
          noFill()
          rect(250 + (i*20),765,15,25)
        }
      }
    }
  }
  this.upsize = function(){
    if (this.sizeLevel < 10 && sun.kills >= this.sizeCost){
      sun.radius += 20
      sun.kills -= this.sizeCost
      this.sizeCost += 25
      this.sizeLevel += 1
    }
  }
  this.upspeed = function(){
    if (this.speedLevel < 10 && sun.kills >= this.speedCost){
      sun.speed += 1
      sun.kills -= this.speedCost
      this.speedCost += 25
      this.speedLevel += 1
    }
  }
  this.uphealthcap = function(){
    if (this.healthCapLevel < 10 && sun.kills >= this.healthCapCost){
      sun.healthCap += 25
      sun.kills -= this.healthCapCost
      this.healthCapCost += 25
      this.healthCapLevel += 1
    }
  }
  this.uplimit = function(){
    if (this.limitLevel < 10 && sun.kills >= this.limitCost){
      lionLimit += 100
      sun.kills -= this.limitCost
      this.limitCost += 25
      this.limitLevel += 1
    }
  }
  this.upspawn = function() {
    if (this.spawnLevel < 10 & sun.kills >= this.spawnCost){
      spawnRate -= .5
      sun.kills -= this.spawnCost
      this.spawnCost += 25
      this.spawnLevel += 1
    }
  }
  this.slowrun = function(){
    if (this.runLevel < 10 && sun.kills >= this.runCost){
      for (let i = 0; i < lions.length; i ++){
        lions[i].runScale += .1
      }
      lionRunScale += .1
      sun.kills -= this.runCost
      this.runCost += 25
      this.runLevel += 1
    }
  }
  this.unlockbullets = function() {
    if (sun.kills >= this.bulletCost){
      bulletsUnlocked = true
      sun.kills -= this.bulletCost
    }
  }
  this.upfirerate = function(){
    if (this.fireRateLevel < 10 && sun.kills >= this.fireRateCost){
      sun.fireRate -= .02
      sun.kills -= this.fireRateCost
      this.fireRateCost += 25
      this.fireRateLevel += 1
    }
  }
  this.upbulletspeed = function(){
    if (this.bulletSpeedLevel < 10 && sun.kills >= this.bulletSpeedCost){
      sun.bulletSpeed += 5
      sun.kills -= this.bulletSpeedCost
      this.bulletSpeedCost += 25
      this.bulletSpeedLevel += 1
    }
  }
  this.upbulletsize = function(){
    if (this.bulletSizeLevel < 10 && sun.kills >= this.bulletSizeCost){
      sun.bulletSize += 5
      sun.bulletHP += 1
      sun.kills -= this.bulletSizeCost
      this.bulletSizeCost += 25
      this.bulletSizeLevel += 1
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
