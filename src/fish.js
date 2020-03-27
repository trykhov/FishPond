// will be our boid object
class Fish {
    constructor(p5, color) {
        this.p5 = p5; // p5 object
        this.pos = p5.createVector(Math.random() * p5.width, Math.random() * p5.height);
        this.acceleration = p5.createVector(0, 0);
        this.velocity = p5.createVector(2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5));
        this.r = 3; // ???
        this.maxSpeed = 3;
        this.maxAccel = 0.1;
        this.color = this.p5.color(color);
        // 
        this.baseSize = Math.floor(Math.random() * 17 + 10);
        this.bodyLength = this.baseSize * Math.floor((Math.random() + 1) * 2);
        this.body = new Array(this.bodyLength).fill({...this.pos});
    }

    swim(fishes) {
        // this function will do the calculations of how the fish should behave in relation to the others
        this.school(fishes);
        // this updates the calculated values in the Fish properties
        this.update();
        // this will wrap the fish around if they swim off the canvas
        this.stayInBounds();
        // this will render the fishes on the screen
        this.draw();
    }

    accelerate(force) {
        // tells the fish how fast to swim away
        this.acceleration.add(force);
    }

    stayInBounds() {
        // like the lilypads, this is to make sure the fishes stay inside the canvas
        let x = this.pos.x;
        let y = this.pos.y;
        let width = this.p5.width;
        let height = this.p5.height;

        if(x < 0) this.pos.x = width;
        if(x > width) this.pos.x = 0;

        if(y < 0) this.pos.y = height;
        if(y > height) this.pos.y = 0;
    }

    // Rule #1: Separation
    // this determines whether or not the fish should avoid collision
    separate(fishes) {
        // looks for nearby fishes and swims away
        let separateCo = 100; // separation coefficient (will play around with)
        let steer = this.p5.createVector(0,0);
        let count = 0;
        for(let i = 0; i < fishes.length; i++) {
            // distance between this fish and the other fishes
            let dummyVector = this.p5.createVector(this.pos.x, this.pos.y);
            let distance = dummyVector.dist(fishes[i].pos);
            // if they're too close
            if((distance > 0) && (distance < separateCo)) {
                let diffVector = this.p5.createVector(this.pos.x, this.pos.y);
                let diff = diffVector.sub(fishes[i].pos);
                // ??
                diff.normalize();
                diff.div(distance); // weigh the difference by the distance (how far means how much to steer)
                steer.add(diff);
                count += 1; // how many total steers tells gives a sense of crowdedness
            }
        }
        if(count > 0) steer.div(count); // how strong of a steer by averaging the crowdedness
        if(steer.mag() > 0) {
            // steer is a vector, so the magnitude tells us how strong of a steer is needed
            steer.normalize();
            steer.mult(this.maxSpeed);
            steer.sub(this.velocity); // go against the current velocity
            steer.limit(this.maxAccel);
        }
        return steer;
    }

    // Rule #2: Align
    // this determines the direction the fish should go to in relation to where the others are heading
    align(fishes) {
        let farthestDist = 300;
        let sum = this.p5.createVector(0,0);
        let count = 0;
        for(let i = 0; i < fishes.length; i++) {
            let dummyVector = this.p5.createVector(this.pos.x, this.pos.y);
            let distance = dummyVector.dist(fishes[i].pos)
            if((distance > 0) && (distance < farthestDist)) {
                sum.add(fishes[i].velocity);
                count += 1;
            }
        }
        if(count > 0) {
            sum.div(count); // average velocity
            sum.normalize();
            sum.mult(this.maxSpeed);
            let steer = sum.sub(this.velocity); // determine direction to steer to group
            steer.limit(this.maxAccel);
            return steer;
        } 
        return this.p5.createVector(0,0); // no need to steer towards them
    }

    // Rule #3: 
    // determines direction fish should swim towards to be with the group
    cohesion(fishes) {
        let farthestDist = 500;
        let sum = this.p5.createVector(0,0);
        let count = 0;
        for(let i = 0; i < fishes.length; i++) {
            let dummyVector = this.p5.createVector(this.pos.x, this.pos.y);
            let distance = dummyVector.dist(fishes[i].pos);
            if((distance > 0) && (distance < farthestDist)) {
                sum.add(fishes[i].pos);
                count += 1;
            }
        }
        if(count > 0) {
            sum.div(count);
            return this.seek(sum);
        }
        return this.p5.createVector(0,0);
    }

    updateBody() {
        this.body.unshift({...this.pos})
        this.body.pop()
    }

    draw() {
        let p = this.p5;
        p.noStroke();
        // a fish is made of ellipses as cross sections
        this.body.forEach((b, index) => {
            let size
            if ( index < this.bodyLength / 6 ) {
                size = this.baseSize + index * 1.8
            } else {
                size = this.baseSize * 2 - index
            }
            this.color.setAlpha(this.bodyLength - index);
            p.fill(this.color);
            p.ellipse(b.x, b.y, size, size)
        })
    }

    // determine how fast to move towards a target
    seek(target) {
        let dummyVector = this.p5.createVector(target.x,target.y);
        let desired = dummyVector.sub(this.pos);
        desired.normalize();
        desired.mult(this.maxSpeed)
        // According to Reynold's, steering = desired - velocity
        let steer = desired.sub(this.velocity);
        steer.limit(this.maxAccel);
        return steer;
    }

    // updates the properties after the 3 rules calculations
    update() {
        let mouse = this.p5.createVector(this.p5.mouseX, this.p5.mouseY);
        let xBound = (5 < mouse.x) && (mouse.x < this.p5.width);
        let yBound = (20 < mouse.y) && (mouse.y < this.p5.height - 50);
        // fish will follow mouse
        if(xBound && yBound) {
            mouse.sub(this.pos);
            mouse.setMag(0.5);
            this.acceleration = mouse;
        }
        this.velocity.add(this.acceleration);
        // speed limit
        this.velocity.limit(this.maxSpeed)
        this.pos.add(this.velocity); // update the position
        this.acceleration.mult(0); // reset the acceleration
        this.updateBody();
    }


    school(fishes) {
        // apply the rules of flock simulation
        let seperate = this.separate(fishes);
        let align = this.align(fishes);
        let group = this.cohesion(fishes);
        // // randomly weigh these factors
        let weights = [seperate.mult(2.5), align.mult(1), group.mult(1)]
        // // add these to the acceleration
        for(let i in weights) {
            this.accelerate(weights[i]);
        }
    }
};

module.exports = Fish;