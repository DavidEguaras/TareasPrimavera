class Food {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.position = this.randomPosition();
    }

    randomPosition() {
        return {
            x: Math.floor(Math.random() * this.gridSize - 1),
            y: Math.floor(Math.random() * this.gridSize - 1)
        };
    }

    resetPosition() {
        this.position = this.randomPosition();
    }
}

export default Food;
