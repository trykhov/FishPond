function LilyPad(ctx) {
    this.ctx = ctx;
    this.x = Math.random() * ctx.canvas.width;
    this.y = Math.random() * ctx.canvas.height;
    this.radius = (Math.random() + 5) * 10;
}

LilyPad.prototype.draw = function() {
    let ctx = this.ctx;
    let x = this.x;
    let y = this.y;
    let radius = this.radius;
    // will consist of two semi-circles that share the same center

    // draw a semi-circle and place on the canvas
    // these are used in both

    // first semicircle
    ctx.beginPath();
    // ctx.translate(x, y); 
    // ctx.rotate(Math.random() * Math.PI / 4);
    ctx.arc(x, y, radius, 0, Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
    
    // second semicircle
    let startAngle2 = Math.PI / 2;
    let endAngle2 = (Math.random() * Math.PI / 2) + startAngle2 +  Math.PI;
    ctx.beginPath();
    // ctx.rotate(Math.random() * Math.PI / 4);
    ctx.arc(x, y, radius, startAngle2, endAngle2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}

LilyPad.prototype.rotate = function() {

}

module.exports = LilyPad;