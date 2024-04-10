export class Ball {
    static colors = ['red', 'blue', 'green'];
    constructor() {
        this.gameArea = document.getElementById("gameArea");
        this.x = Math.floor(Math.random() * this.gameArea.offsetWidth - 20);
        this.y = Math.floor(Math.random() * this.gameArea.offsetHeight - 20);
        this.vx = Math.random() * 6 - 5;
        this.vy = Math.random() * 6 - 5;
        this.color = Ball.colors[Math.floor(Math.random() * Ball.colors.length)];
        this.radius = Math.floor(Math.random() * (30 - 5 )) + 10;

        this.element = document.createElement('div');
        this.element.classList.add('ball');
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.backgroundColor = this.color;
        this.gameArea.appendChild(this.element);
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        
        //Compruebo las colisiones dentro del movimiento
        if (this.x <= 0 || this.x >= this.gameArea.offsetWidth - this.radius * 2) {
            this.vx *= -1;
        }
        if (this.y <= 0 || this.y >= this.gameArea.offsetHeight - this.radius * 2) {
            this.vy *= -1;
        }

        //cambiamos la posicion en el gameArea desde la propia funcion
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
}