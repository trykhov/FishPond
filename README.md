# Koi Pond Animation

[Live Demo](https://trykhov.github.io/FishPond/)

![demo_gif](./assets/demo.gif)

## Inspiration

I wanted to do something animation related and I wanted to do something that involved koi fishes. I found setting interesting simply because of my recent meditative practice and wanted to replicate what I envision when I practice meditating. 

---

## Research

Before I jumped in, I needed to know how to create this. I knew that I had to use HTML Canvas but I was new to animations. In researching online, I found a library ([P5.js](https://p5js.org/)) that seems to help me with a lot of what I wanted to do in terms of animations and developing shapes.

---

### NOTE: 
Before I continue, I want to give credit to Craig Reynolds and Daniel Shiffman for their [flocking simulation algorithm](https://en.wikipedia.org/wiki/Boids). Much of this code utilizes this algorithm in order to allow the fishes to move to give off a "natural" look of motion.

In addition, I want to credit [Weijia Li](https://unicar9.github.io/weijia/#page1)'s animation of the koi pond. While I didn't know how to animate the fishes, I drew inspiration from her code and added a bit of my flavor into it. 

---

## Implementation

### Flocking Simulation

Code Snippet:
```
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
```

The flocking algorithm is much more complicated than the code snippet shown above but much of what it does is as follows:

Each fish is an object that has a starting position on the canvas, a random velocity and an initial acceleration of 0.
Each fish is aware of every other fishes' position. As it swims around the canvas, it calculates its distance from each fish and determines a steering acceleration to prevent it from crashing into the other fishes. 

Now because every fish in the school is doing this, they all contribute to the general direction and movement of the school. 

The flocking simulation entails three simple rules that the school follows:

1. Separation: action and direction that each fish swims to avoid colliding with others in the school

2. Alignment: this takes into account every fishes current velocity and determines the overall direction of the school

3. Cohension: this is what keeps the school together and grouped rather than separate fishes swimming in their way

What's incredible is that each fish contributes to the movement of the entire school because each one relies their direction on what the others are doing!


### Fish animation

Code Snippet:
```
draw() {
    let p = this.p5;
    p.noStroke();
    // a fish is made of ellipses as cross sections
    this.body.forEach((b, index) => {
        let size
        // as you go further down the list, the body gets slimmer
        if ( index < this.bodyLength / 6 ) {
            size = this.baseSize + index * 1.8
        } else {
            size = this.baseSize * 2 - index
        }
        // high concentration of color at the head and 
        // low at the tail to give the effect of a tail
        this.color.setAlpha(this.bodyLength - index);
        p.fill(this.color);
        p.ellipse(b.x, b.y, size, size)
    })
}
```

The animation for the fish is rather interesting. Essentially the fish is made of a collection of circles overlapping each other with varying diameters. Starting from the head, that's where the largest circle will reside and as it goes down the body length, the cirlces get smaller. In addition, the color opacity is high starting at the head and goes lower as it goes to the end, which gives off the tail effect.


### Following Cursor

Code Snippet:

```
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
```

I wanted to add a feature that acted like the user was sticking their finger above a fish tank. Often, fishes will think of the finger as food and follow it to get a bite and I wanted to replicate something similar to that in the program.

Basically, if the mouse is within bounds of the canvas (over the water) then the acceleration of the fishes should move towards the cursor. This program had a lot of vector math involved and often require a lot of knowledge of vectors in order to implement.

---

## Future Improvements

This project is far from perfect. While it is still early practice for me using HTML canvas, I definitely learned a lot and would love to add more features and improvements to this program such as:

• Improving flocking algorithm: this program takes up a lot of computational power simply because it requires each fish to look at each other fish in order to determine where it should move. This bottlenecks the program into an `O(n^2)` runtime.

• Colliding lilypads: right now the lilypads were more decorative and were designed to give the canvas a sense of depth, as if the fishes were swimming underneath it. However, in the future I would like to implement a feature that allows them to bounce off each other when they collide

• Improvements on animations: While I really admire the animation involved, I believe that the fish animation could be improved so that they can be more clearly seen.
