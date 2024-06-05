const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const unit = 20;
const row = canvas.height / unit;
const col = canvas.width / unit;

let score = 0;

let snake = [];

snake[0] = {
  x: 80,
  y: 0,
};
snake[1] = {
  x: 60,
  y: 0,
};
snake[2] = {
  x: 40,
  y: 0,
};
snake[3] = {
  x: 20,
  y: 0,
};

class Food {
  constructor() {
    this.changeLocation();
  }

  drawfood() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  changeLocation() {
    this.x = Math.floor(Math.random() * col) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
}

let food = new Food();

let d = "ArrowRight";
function checkDirection(e) {
  if (e.key == "ArrowRight" && d != "ArrowLeft") {
    d = "ArrowRight";
  }
  if (e.key == "ArrowLeft" && d != "ArrowRight") {
    d = "ArrowLeft";
  }
  if (e.key == "ArrowUp" && d != "ArrowDown") {
    d = "ArrowUp";
  }
  if (e.key == "ArrowDown" && d != "ArrowUp") {
    d = "ArrowDown";
  }

  removeEventListener("keydown", checkDirection);
}

let browserScore = document.getElementById("myP2");

if (localStorage.getItem("score")) {
  browserScore.innerText = "Browser record：" + localStorage.getItem("score");
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    while (snake[i].x == food.x && snake[i].y == food.y) {
      food.changeLocation();
    }

    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";

      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        clearInterval(myGame);
        if (score > localStorage.getItem("score")) {
          localStorage.setItem("score", score);
          browserScore.innerText =
            "Browser record：" + localStorage.getItem("score");
        }

        alert("遊戲結束");
      }
    }
    ctx.strokeStyle = "white";

    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  food.drawfood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "ArrowRight") {
    snakeX += unit;
  } else if (d == "ArrowLeft") {
    snakeX -= unit;
  } else if (d == "ArrowUp") {
    snakeY -= unit;
  } else if (d == "ArrowDown") {
    snakeY += unit;
  }

  if (snakeX >= canvas.width) {
    snakeX = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width - unit;
  }
  if (snakeY > canvas.height) {
    snakeY = 0;
  }
  if (snakeY < 0) {
    snakeY = canvas.height - unit;
  }

  let newSnake = {
    x: snakeX,
    y: snakeY,
  };

  if (food.x == snakeX && food.y == snakeY) {
    score++;
    let gameScore = document.getElementById("myP");
    gameScore.innerText = "Game score：" + score;
  } else {
    snake.pop();
  }
  snake.unshift(newSnake);

  addEventListener("keydown", checkDirection);
}

let myGame = setInterval(draw, 100);
