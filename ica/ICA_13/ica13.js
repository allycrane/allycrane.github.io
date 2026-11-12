const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;


function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randomRGB() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }


  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }


  update() {
    this.x += this.velX;
    this.y += this.velY;

    if (this.x + this.size >= width) {
      this.x = width - this.size;
      this.velX = -Math.abs(this.velX);
    } else if (this.x - this.size <= 0) {
      this.x = this.size;
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.y = height - this.size;
      this.velY = -Math.abs(this.velY);
    } else if (this.y - this.size <= 0) {
      this.y = this.size;
      this.velY = Math.abs(this.velY);
    }
  }


  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          const newColor = randomRGB();

          this.color = newColor;
          ball.color = newColor;
        }
      }
    }
  }
}

const balls = [];


while (balls.length < 25) {
  const size = random(10, 20);

  let velX = random(-7, 7);
  let velY = random(-7, 7);


  if (velX === 0 && velY === 0) {
    velX = 1;
  }

  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    velX,
    velY,
    randomRGB(),
    size
  );

  balls.push(ball);
}


window.addEventListener("resize", function () {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});


function loop() {

  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.update();
    ball.collisionDetect();
    ball.draw();
  }

  requestAnimationFrame(loop);
}

loop();