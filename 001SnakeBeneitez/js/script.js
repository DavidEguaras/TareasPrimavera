import { Snake } from "./snake.js";
import { Food } from "./food.js";

const gameArea = document.getElementById('gameArea');
let snake = new Snake(200, 200, 'right');
const food = new Food();
food.generateFood();
food.drawFood(gameArea);

document.addEventListener("keydown", function(event){
    switch(event.key){
        case "ArrowDown":
            if (snake.direction !== 'up') snake.direction = 'down';
            break;
        case "ArrowUp":
            if (snake.direction !== 'down') snake.direction = 'up';
            break;
        case "ArrowLeft":
            if (snake.direction !== 'right') snake.direction = 'left';
            break;
        case "ArrowRight":
            if (snake.direction !== 'left') snake.direction = 'right';
            break;
    }
});

function restartGame() {
    snake = new Snake(200, 200, 'right');
    food.generateFood();
}

function gameLoop() {
    snake.move();
    if (snake.checkEat(food)) {
        snake.grow();
        food.generateFood();
    }

    if (snake.checkCollisionWall() || snake.checkCollisionBody()) {
    }

    snake.drawSnake(gameArea);
    food.drawFood(gameArea);

    setTimeout(gameLoop, 100);
}

//EJECUTO EL JUEGO
gameLoop();
