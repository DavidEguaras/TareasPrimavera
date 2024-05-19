class Snake {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.body = [{x: 10, y: 10}];
        this.direction = {x: 0, y: 0};
        this.grow = false;
    }

    update() {
        const head = {x: this.body[0].x + this.direction.x, y: this.body[0].y + this.direction.y};
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.gridSize - 1|| head.y < 0 || head.y >= this.gridSize - 1) {
            return false; // Collision detected
        }

        if (this.grow) {
            this.body.unshift(head);
            this.grow = false;
        } else {
            this.body.pop();
            this.body.unshift(head);
        }

        // Check self collision
        if (this.checkCollision()) {
            return false; // Collision detected
        }

        return true; // No collision
    }

    setDirection(newDirection) {
        this.direction = newDirection;
    }

    growSnake() {
        this.grow = true;
    }

    checkCollision() {
        const head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    checkFoodCollision(food) {
        const head = this.body[0];
        return head.x === food.position.x && head.y === food.position.y;
    }

    getHead() {
        return this.body[0];
    }

    getBody() {
        return this.body;
    }
}

export default Snake;
