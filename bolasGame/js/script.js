import { Ball } from "./ball.js"
document.getElementById('ballCreatorButton').addEventListener("click", createBalls)


const balls = [];

function createBalls() {
    balls.push(new Ball());
}

function moveBalls() {
    balls.forEach(ball => {
        ball.move();
    });
    checkCollisionBalls();
    requestAnimationFrame(moveBalls);
}

function checkCollisionBalls() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            //calculamos la distancia entre los dos puntos en el eje x y el eje y
            const dx = balls[i].x - balls[j].x;
            const dy = balls[i].y - balls[j].y;
            //calculamos la distancia entre los dos puntos usando pitagoras
            const distance = Math.sqrt(dx * dx + dy * dy);

            //si la distancia es menor a la suma de los radios, es colision(con otra bola)
            if (distance < balls[i].radius + balls[j].radius) {
                const tempVx = balls[i].vx;
                const tempVy = balls[i].vy;
                balls[i].vx = balls[j].vx;
                balls[i].vy = balls[j].vy;
                balls[j].vx = tempVx;
                balls[j].vy = tempVy;
            }
        }
    }
}
createBalls();
createBalls();
moveBalls();