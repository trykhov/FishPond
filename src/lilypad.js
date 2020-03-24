class Lilypad {
    constructor(p5) {
        this.x = Math.random() * p5.width;
        this.y = Math.random() * p5.height;
        this.radius = (Math.random() + 1) * 25;
        this.acceleration = [0,0];
        this.velocity = [2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5)];
        this.angle = p5.PI + (7 * p5.PI / 8);
        this.p5 = p5;
    }

    draw() {
        let p = this.p5;
        let x = this.x;
        let y = this.y;
        let d = this.radius * 2;
        let angle = this.angle;
        p.arc(x, y, d, d, 0, angle);
        p.fill("green");
        p.noStroke();
    }

    move() {
        let p = this.p5;
        this.x += this.velocity[0];
        this.y += this.velocity[1];

        if(this.x + this.radius < 0) {
            this.x = p.width;
        } else if(this.x - this.radius > p.width) {
            this.x = 0;
        }

        if(this.y + this.radius < 0) {
            this.y = p.height;
        } else if(this.y - this.radius > p.height) {
            this.y = 0;
        }

        this.draw();
    }
}

module.exports = Lilypad;