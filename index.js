const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground= "lightgrey";
const snakeColor = "green";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize; //how far we move on the x axis
let yVelocity = 0; //how far we move on the y axis, not moving up or down
let foodX;
let foodY;
let score = 0;
let snake = [ //array of objects
    {x:unitSize * 4, y:0}, //x; tale,, body parts
    {x:unitSize * 3, y:0}, 
    {x:unitSize * 2, y:0},
    {x:unitSize ,y:0},
    {x:0, y:0}
    //each object is a body part
];

window.addEventListener("keydown", changeDirection); //callback
resetBtn.addEventListener("click", resetGame); //restart the game

gameStart();

    function gameStart(){
        running = true; //currently running
        scoreText.textContent = score; //init 0
        createFood();
        drawFood();
        nextTick();
    };

    function nextTick(){
        if(running){
            setTimeout(() => {
                clearBoard();
                drawFood();
                moveSnake();
                drawSnake();
                checkGameOver();
                nextTick();
            }, 76); //decrease for faster speed
        }
        else {
            displayGameOver();
        }
    };

    function clearBoard(){
        ctx.fillStyle = boardBackground;
        ctx.fillRect(0, 0, gameWidth, gameHeight);
    };

    function createFood(){
        function randomFood(min, max){
            const randNum = Math.round((Math.random() * (max - min) +min ) / unitSize) * unitSize;
                 return randNum;
        }
        foodX = randomFood(0, gameWidth - unitSize);
        foodY = randomFood(0, gameWidth - unitSize);

    };

    function drawFood(){
        ctx.fillStyle = foodColor;
        ctx.fillRect(foodX, foodY, unitSize, unitSize); //to fill the rects

    };

    function moveSnake(){
        const head = {x: snake[0].x + xVelocity, 
                       y: snake[0].y + yVelocity };
                    snake.unshift(head); //beside the head
                    //if food is eaten
                        if(snake[0].x == foodX && snake[0].y == foodY){
                            score += 1;
                            scoreText.textContent = score;
                            createFood();
                        }
                        else {
                            snake.pop();
                        }
    };

    function drawSnake(){
        ctx.fillStyle = snakeColor;
        ctx.strokeStyle = snakeBorder;
        snake.forEach(snakePart => {
            ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
            ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        })
    };

    function changeDirection(event){
        const keyPressed = event.keyCode;
            const left = 37;
            const up = 38;
            const right = 39;
            const down = 40;

            const goingUp = (yVelocity == -unitSize);
            const goingDown = (yVelocity == unitSize);
            const goingRight = (xVelocity == unitSize);
            const goingLeft = (xVelocity == -unitSize);

                switch(true){
                    case(keyPressed == left && !goingRight):
                        xVelocity = -unitSize;
                        yVelocity = 0;
                          break;
                    case(keyPressed == up && !goingDown):
                         xVelocity = 0;
                         yVelocity = -unitSize;
                            break;
                    case(keyPressed == right && !goingLeft):
                         xVelocity = unitSize;
                         yVelocity = 0;
                           break;
                    case(keyPressed == down && !goingUp):
                         xVelocity = 0;
                         yVelocity = unitSize;
                           break;
                }

    };

    function checkGameOver(){
        switch(true){
            case(snake[0].x < 0 ): //went over left boarder
                running = false;
                    break;
            case(snake[0].x >= gameWidth ): //right boarder
                    running = false;
                        break;
            case(snake[0].y < 0 ): //go over the top
                        running = false;
                            break;
            case(snake[0].y >= gameHeight ): //bottom boarder
                            running = false;
                                break;
        }
        //overlaped parts of snake
            let i = 1;
            l = snake.length;
            for(i; i < l; i+=1){
                if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
                    running = false;
                }
            }
    };

    function displayGameOver(){
        ctx.font = "50px Sans-serif";
        ctx.fillStyle = "Black";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", gameWidth / 2, gameHeight /2) //in middle
        running = false;
    };

    function resetGame(){
        score = 0;
        xVelocity = unitSize; //25
        yVelocity = 0;
        //remake of snake
         snake = [
            {x:unitSize * 4 ,y:0},
            {x:unitSize * 3 ,y:0}, 
            {x:unitSize * 2 ,y:0},
            {x:unitSize ,y:0},
            {x:0 ,y:0}
            
        ];
            gameStart();
    };