var sun
var lions = []

function setup() {
  var gameCanvas = createCanvas(800, 800)
  gameCanvas.parent("gameContainer")
  sun = new Sun()
  for (let i = 0; i < 100; i++) {
    lions.push(new Lion())
  }
}

function draw() {
  background(0)
  for (let i = 0; i < lions.length; i++) {
    lions[i].show()
  }
  sun.show()
  this.move()

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
