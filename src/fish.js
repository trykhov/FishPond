// treat this as a boid
function Fish(ctx) {
    this.ctx = ctx;

    // give it a random starting position on the canvas
    let x = Math.random() * ctx.canvas.width;
    let y = Math.random() * ctx.canvas.height;
    this.pos = [x, y];
    
    this.acceleration = [0, 0];
    this.velocity = [2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5)]; 
}

Fish.prototype.swim = function(fishes) {
    this.school(fishes); // determine their place and situation
    this.update(); // update their velocity accordingly

    this.render(); // render them accordingly 
}

Fish.prototype.applyForce = function(amount) {
    
}

module.exports = Fish;