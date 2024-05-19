import Snake from './snake.js';
import Food from './food.js';

const gameArea = document.getElementById('gameArea');
const gridSize = 20;
const snake = new Snake(gridSize);
const food = new Food(gridSize);
let lastTime = 0;
const gameSpeed = 200; // in milliseconds

function gameLoop(timestamp) {
    if (timestamp - lastTime > gameSpeed) {
        lastTime = timestamp;

        if (!snake.update()) {
            alert('Game Over!');
            resetGame();
        }

        if (snake.checkFoodCollision(food)) {
            snake.growSnake();
            food.resetPosition();
        }

        drawGame();
    }

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    snake.body = [{x: 10, y: 10}];
    snake.direction = {x: 0, y: 0};
    food.resetPosition();
}

function drawGame() {
    gameArea.innerHTML = '';

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.position.y + 1;
    foodElement.style.gridColumnStart = food.position.x + 1;
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);

    snake.getBody().forEach(part => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = part.y + 1;
        snakeElement.style.gridColumnStart = part.x + 1;
        snakeElement.classList.add('snake');
        gameArea.appendChild(snakeElement);
    });
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (snake.direction.y === 0) snake.setDirection({x: 0, y: -1});
            break;
        case 'ArrowDown':
            if (snake.direction.y === 0) snake.setDirection({x: 0, y: 1});
            break;
        case 'ArrowLeft':
            if (snake.direction.x === 0) snake.setDirection({x: -1, y: 0});
            break;
        case 'ArrowRight':
            if (snake.direction.x === 0) snake.setDirection({x: 1, y: 0});
            break;
    }
});

requestAnimationFrame(gameLoop);
