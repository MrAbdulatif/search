
// Get the canvas element
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

// Set up the game variables
let snake = [{x: 10, y: 10}];
let direction = "right";
let food = getRandomFood();
let score = 0;

// Set up the game loop
setInterval(() => {
  draw();
  move();
}, 100);

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.code === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.code === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.code === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

// Draw the game board
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "green";
  snake.forEach((part) => {
    ctx.fillRect(part.x, part.y, 10, 10);
  });

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);

  // Draw the score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Move the snake
function move() {
  // Move the snake
  let head = {x: snake[0].x, y: snake[0].y};
  if (direction === "up") {
    head.y -= 10;
  } else if (direction === "down") {
    head.y += 10;
  } else if (direction === "left") {
    head.x -= 10;
  } else if (direction === "right") {
    head.x += 10;
  }
  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    food = getRandomFood();
    score++;
  } else {