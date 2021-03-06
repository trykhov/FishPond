class Lilypad {
    constructor(p5) {
        this.pos = p5.createVector(Math.random() * p5.width, Math.random() * p5.height);
        this.radius = (Math.random() + 1)  * 30;
        this.velocity = p5.createVector(2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5));
        this.angle = p5.PI + (7 * p5.PI / 8);
        this.p5 = p5;
        this.rotate = 0;
    }

    draw() {
        let p = this.p5;
        let d = this.radius * 2;
        let angle = this.angle;
        let r = this.radius;
        // the translation below has shifted the location of the center
        p.noStroke();
        // lilypad stem
        p.fill("green");
        p.arc(0, 0, d, d, 0, angle);
        // lilypad white flower
        p.fill("white");
        p.beginShape();
        p.vertex(0.75 * r, 0);
        p.vertex(0.25 * r, 0.25 * r);
        p.vertex(0, 0.75 * r);
        p.vertex(-0.25 * r, 0.25 * r);
        p.vertex(-0.75 * r, 0);
        p.vertex(-0.25 * r, -0.25 * r);
        p.vertex(0, -0.75 * r);
        p.vertex(0.25 * r, -0.25 * r);
        p.endShape();

        // pink flower
        p.fill("pink");
        p.beginShape();
        p.vertex(0.375 * r, 0);
        p.vertex(0.25 * r, 0.25 * r);
        p.vertex(0, 0.375 * r);
        p.vertex(-0.25 * r, 0.25 * r);
        p.vertex(-0.375 * r, 0);
        p.vertex(-0.25 * r, -0.25 * r);
        p.vertex(0, -0.375 * r);
        p.vertex(0.25 * r, -0.25 * r);
        p.endShape();
        p.pop(); // end container of the push()
    }

    move() {
        let p = this.p5;
        this.pos.add(this.velocity);
        let x = this.pos.x;
        let y = this.pos.y;

        if(x + this.radius < 0) {
            this.pos.x = p.width;
        } else if(x - this.radius > p.width) {
            this.pos.x = 0;
        }
        if(y + this.radius < 0) {
            this.pos.y = p.height;
        } else if(y - this.radius > p.height) {
            this.pos.y = 0;
        }

        p.push(); // saves the state and containers each element
        this.rotate += 0.01;
        p.translate(this.pos.x, this.pos.y);
        p.ellipseMode(p.CENTER);
        p.rotate(this.rotate);
        
        this.draw();
    }
}

module.exports = Lilypad;