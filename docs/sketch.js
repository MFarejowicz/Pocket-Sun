var bg
var cs
var sun
var lions = []
var startMenu
var startMenuActive = true
var upMenu
var upMenuActive = false
var pause = false
var gameOver
var gameOverActive = false
var bulletsUnlocked = false
var spawnRate = 5 //decrease to increase spawn
var lionLimit = 100
var lionRunScale = .8
var lionSpeed = 2

function preload() {
  cs = loadFont('../static/fonts/cs.ttf')
}

function setup() {
  // bg = loadImage("../static/img/space.jpg")
  textFont(cs)
  var gameCanvas = createCanvas(800, 800)
  gameCanvas.parent("gameContainer")
  startMenu = new StartMenu()
  gameOver = new GameOver()
  sun = new Sun()
  upMenu = new upMenu()
}

function draw() {
  background(0)
  if (this.startMenuActive){
    startMenu.show()
  }
  else if (this.upMenuActive) {
    upMenu.show(sun,lions)
  }
  else if (this.gameOverActive) {
    gameOver.show()
  }
  else if (this.pause){
    for (let i = lions.length-1; i >=0; i--){
      lions[i].show()
    }
    sun.show()
  }
  else {
    this.moveandshoot()
    if (frameCount % spawnRate == 0 && lions.length < lionLimit) {
      lions.push(new Lion(lionSpeed, lionRunScale))
      if (spawnRate < 1) {
        lions.push(new Lion(lionSpeed, lionRunScale))
      }
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
    if (sun.health <= 0) {
      gameOverActive = true
    }
  }
}

function keyPressed() {
  if (this.startMenuActive && keyCode === 32){
    this.startMenuActive = false
  }
  else if (!this.startMenuActive && !this.upMenuActive && keyCode === 69){
    this.upMenuActive = true
  }
  else if (this.upMenuActive && keyCode === 69){
    this.upMenuActive = false
  }
  else if (this.upMenuActive && keyCode === 49) {
    upMenu.upsize()
  }
  else if (this.upMenuActive && keyCode === 50) {
    upMenu.upspeed()
  }
  else if (this.upMenuActive &&keyCode === 51) {
    upMenu.uphealthcap()
  }
  else if (this.upMenuActive && keyCode === 52) {
    upMenu.uplimit()
  }
  else if (this.upMenuActive && keyCode === 53) {
    upMenu.upspawn()
  }
  else if (this.upMenuActive && keyCode === 54) {
    upMenu.slowrun()
  }
  else if (this.upMenuActive && !this.bulletsUnlocked && keyCode === 55) {
    upMenu.unlockbullets()
  }
  else if (this.upMenuActive && this.bulletsUnlocked && keyCode === 56) {
    upMenu.upfirerate()
  }
  else if (this.upMenuActive && this.bulletsUnlocked && keyCode === 57) {
    upMenu.upbulletspeed()
  }
  else if (this.upMenuActive && this.bulletsUnlocked && keyCode === 48) {
    upMenu.upbulletsize()
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

function upMenu() {
  this.sizeCost = 10
  this.sizeLevel = 1
  this.speedCost = 10
  this.speedLevel = 1
  this.healthCapCost = 10
  this.healthCapLevel = 1
  this.limitCost = 10
  this.limitLevel = 1
  this.spawnCost = 10
  this.spawnLevel = 1
  this.runCost = 10
  this.runLevel = 1
  this.bulletCost = 1000
  this.fireRateCost = 10
  this.fireRateLevel = 1
  this.bulletSpeedCost = 10
  this.bulletSpeedLevel = 1
  this.bulletSizeCost = 10
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
    text("Current: " + round(map(sun.radius,25,115,25,100)), 250, 140)
    text("Cost: " + this.sizeCost, 500, 140)
    text("Press 1 to upgrade", 50, 160)
    text("Sun speed", 30, 200)
    text("Current: " + round(map(sun.speed, 4, 8.5, 25, 52)), 250, 200)
    text("Cost: " + this.speedCost, 500, 200)
    text("Press 2 to upgrade", 50, 220)
    text("Sun health cap", 30, 260)
    text("Current: " + round(sun.healthCap), 250, 260)
    text("Cost: " + this.healthCapCost, 500, 260)
    text("Press 3 to upgrade", 50, 280)
    text("Lion limit", 30, 360)
    text("Current: " + lionLimit, 250, 360)
    text("Cost: " + this.limitCost, 500, 360)
    text("Press 4 to upgrade", 50, 380)
    text("Lion spawn rate", 30, 420)
    text("Current: " + (spawnRate >= 1 ? round(map(spawnRate, 5, .5, 12, 60)) : 120), 250, 420)
    text("Cost: " + this.spawnCost, 500, 420)
    text("Press 5 to upgrade", 50, 440)
    text("Lion run speed", 30, 480)
    text("Current: " + round(map(lionRunScale, .8, 1.25, 20, 2)), 250, 480)
    text("Cost: " + this.runCost, 500, 480)
    text("Press 6 to upgrade", 50, 500)
    text("Unlock bullets!", 30, 580)
    text("Current: " + (bulletsUnlocked ? "Unlocked" : "Locked"), 250, 580)
    text("Cost: " + this.bulletCost, 500, 580)
    text("Press 7 to upgrade", 50, 600)
    if (bulletsUnlocked) {
      text("Bullet fire rate", 30, 640)
      text("Current: " + round(map(sun.fireRate, .2,.065, 2, 20)), 250, 640)
      text("Cost: " + this.fireRateCost, 500, 640)
      text("Press 8 to upgrade", 50, 660)
      text("Bullet speed", 30, 700)
      text("Current: " + round(map(sun.bulletSpeed, 10,19,55,100)), 250, 700)
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
      sun.radius += 10
      sun.kills -= this.sizeCost
      this.sizeCost += 10
      this.sizeLevel += 1
    }
  }
  this.upspeed = function(){
    if (this.speedLevel < 10 && sun.kills >= this.speedCost){
      sun.speed += .5
      sun.kills -= this.speedCost
      this.speedCost += 10
      this.speedLevel += 1
    }
  }
  this.uphealthcap = function(){
    if (this.healthCapLevel < 10 && sun.kills >= this.healthCapCost){
      sun.healthCap += (150/9)
      sun.kills -= this.healthCapCost
      this.healthCapCost += 10
      this.healthCapLevel += 1
    }
  }
  this.uplimit = function(){
    if (this.limitLevel < 10 && sun.kills >= this.limitCost){
      lionLimit += 100
      sun.kills -= this.limitCost
      this.limitCost += 10
      this.limitLevel += 1
    }
  }
  this.upspawn = function() {
    if (this.spawnLevel < 10 & sun.kills >= this.spawnCost){
      spawnRate -= .5
      sun.kills -= this.spawnCost
      this.spawnCost += 10
      this.spawnLevel += 1
    }
  }
  this.slowrun = function(){
    if (this.runLevel < 10 && sun.kills >= this.runCost){
      for (let i = 0; i < lions.length; i ++){
        lions[i].runScale += .05
      }
      lionRunScale += .05
      sun.kills -= this.runCost
      this.runCost += 10
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
      sun.fireRate -= .015
      sun.kills -= this.fireRateCost
      this.fireRateCost += 10
      this.fireRateLevel += 1
    }
  }
  this.upbulletspeed = function(){
    if (this.bulletSpeedLevel < 10 && sun.kills >= this.bulletSpeedCost){
      sun.bulletSpeed += 1
      sun.kills -= this.bulletSpeedCost
      this.bulletSpeedCost += 10
      this.bulletSpeedLevel += 1
    }
  }
  this.upbulletsize = function(){
    if (this.bulletSizeLevel < 10 && sun.kills >= this.bulletSizeCost){
      sun.bulletSize += 3
      sun.bulletHP += 1
      sun.kills -= this.bulletSizeCost
      this.bulletSizeCost += 10
      this.bulletSizeLevel += 1
    }
  }
}

function StartMenu() {

  this.show = function() {
    fill(255)
    rect(0,0,799,799)
    fill(204,102,0)
    ellipse(650, 525, 80, 80)
    fill("white")
    ellipse(600, 325, 20,20)
    ellipse(640, 310, 20,20)
    ellipse(680, 380, 20,20)
    ellipse(670, 285, 20,20)
    ellipse(630, 360, 20,20)
    fill("black")
    line(650, 585, 650, 615)
    line(630, 580, 630, 610)
    line(670, 580, 670, 610)
    fill("#f17e33")
    textSize(100)
    text("POCKET SUN!", 20, 100)
    textSize(60)
    text("The Game", 60, 160)
    textSize(20)
    textStyle(ITALIC)
    text("To answer the age old question:", 20, 200)
    text("Who would win? 1 trillion lions or the sun?", 60, 230)
    textStyle(BOLD)
    text("Gameplay:", 20, 300)
    text("Instructions:", 20, 600)
    textStyle(NORMAL)
    text("You play as the sun! It is your mission to exterminate", 30, 320)
    text(" 1 trillion lions and prove that you are the superior", 30, 340)
    text(" mass in the universe.", 30, 360)
    text("Run over lions to consume them and recharge your", 30, 390)
    text(" constantly draining solar mass", 30, 410)
    text("Spend your earned kills to get upgrades and increase", 30, 440)
    text(" your killing potential", 30, 460)
    text("Be on the lookout for stronger enemies and mini-bosses.", 30, 490)
    text(" They can fight back, but offer greater kill rewards", 30, 510)
    text("Use WASD to move around", 30, 620)
    text("Use Q to pause and unpause", 30, 650)
    text("Use E to open and close the upgrade menu", 30, 680)
    text("Follow the upgrade menu instructions to purchase upgrades", 40, 700)
    text("Use the arrow keys to shoot (once unlocked)", 30, 730)
    textSize(30)
    text("Press SPACE to start the game!", 190, 780)
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
