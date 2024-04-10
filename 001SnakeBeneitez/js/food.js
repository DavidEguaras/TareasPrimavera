export class Food {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.color = "yellow"; 
    }

    //Esto se lo tuve que preguntar a chatgpt porque no tenia ni idea de porque no se me generaba bien
    generateFood() {
        this.x = Math.floor(Math.random() * 20) * 20;
        this.y = Math.floor(Math.random() * 20) * 20;
    }

    drawFood(gameArea) {
        const foodElement = document.createElement('div');
        foodElement.style.width = '20px';
        foodElement.style.height = '20px';
        foodElement.style.backgroundColor = this.color;
        foodElement.style.position = 'absolute';
        foodElement.style.left = `${this.x}px`;
        foodElement.style.top = `${this.y}px`;
        gameArea.appendChild(foodElement);
    }
}
