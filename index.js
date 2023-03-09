const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector(".score");
const restartBtn = document.getElementById("restartBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const Unitsize = 25;
let running = false;
let xVelocity = Unitsize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:Unitsize * 4 , y:0},
    {x:Unitsize * 3, y:0},
    {x:Unitsize * 2, y:0},
    {x:Unitsize, y:0},
    {x:0 , y:0}
];
window.addEventListener("keydown", changeDirection)
restartBtn.addEventListener("click", restartGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running)
    {
        setTimeout(() =>{
        clearBoard();
        drawFood();
        moveSnake();
        DrawSnake();
        checkGameOver();
        nextTick();

        }, 75);
    }
    else
    {
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight); 
};
function createFood(){
    function randomNumber(min,max)
    {
        const randomNum = Math.round((Math.random() * (max -min) + min)/Unitsize *Unitsize);
        return randomNum;
    }

    foodX = randomNumber(0, gameWidth - Unitsize);
    foodY = randomNumber(0, gameWidth - Unitsize);
    console.log(foodX);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, Unitsize, Unitsize);
}
function DrawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, Unitsize, Unitsize);
        ctx.strokeRect(snakePart.x, snakePart.y, Unitsize, Unitsize);
    })
};
function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);
  
    // Check if snake has eaten the food
    const foodRange = Unitsize / 2;
    if (
      head.x >= foodX - foodRange &&
      head.x < foodX + Unitsize + foodRange &&
      head.y >= foodY - foodRange &&
      head.y < foodY + Unitsize + foodRange
    ) {
      score += 1;
      scoreText.textContent = score;
      createFood();
    } else {
      snake.pop();
    }
  }
function changeDirection(event){
    const keyPressed = event.keyCode;
    const KeyUp = 38;
    const KeyDown = 40;
    const KeyRight = 39;
    const KeyLeft = 37;

    const goUp = (yVelocity == -Unitsize);
    const goDown = (yVelocity == Unitsize);
    const goRight = (xVelocity == Unitsize);
    const goLeft = (xVelocity == -Unitsize);


    switch(true)
    {
        case(keyPressed == KeyLeft && !goRight):
        xVelocity = -Unitsize;
        yVelocity = 0;
        break;


        case(keyPressed == KeyUp && !goDown):
        xVelocity = 0;
        yVelocity = -Unitsize;
        break;


        case(keyPressed == KeyRight && !goLeft):
        xVelocity = Unitsize;
        yVelocity = 0;
        break;



        case(keyPressed ==KeyDown && !goUp):
        xVelocity = 0;
        yVelocity = Unitsize;
        break;


    }
};
function checkGameOver(){
    switch(true)
    {
        case(snake[0].x < 0):
        running = false;
        break;


        case(snake[0].x >= gameWidth):
        running =false;
        break;


        case(snake[0].y < 0):
        running = false;
        break;

        case(snake[0].y >= gameHeight):
        running = false;
        break;
    }

    for(let i = 1; i < snake.length; i+=1)
    {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
        running = false;
    } 
};
function displayGameOver(){
    ctx.font = "50px sans-serif";
    ctx.fillStyle = "black";
    ctx.texAlign  = "center";
    ctx.fillText("GAME OVER", gameWidth/4, gameHeight/4);
    running = false; 
};
function restartGame(){
    running = false;
    score = 0;
    xVelocity = Unitsize;
    yVelocity = 0;
     snake = [
    {x:Unitsize * 4 , y:0},
    {x:Unitsize * 3, y:0},
    {x:Unitsize * 2, y:0},
    {x:Unitsize, y:0},
    {x:0 , y:0}
];

gameStart();
};



