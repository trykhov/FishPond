

class Fish {
    constructor(canvasWidth, canvasHeight, p5) {
        let x = Math.random() * canvasWidth;
        let y = Math.random() * canvasHeight;
        this.pos = [x,y];
        this.acceleration = [0,0];
        this.velocity = [2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5)];
        this.p5 = p5;
    }

    swim() {

    }
};

module.exports = Fish;