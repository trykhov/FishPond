const LilyPad = require("./lilypad");

function Scenery(ctx, object) {
    this.object = object;
    this.ctx = ctx;
}

Scenery.prototype.populate = function(num) {
    if(this.object instanceof LilyPad) {
        for(let i = 0; i < num; i++) {
            let lilypad = new LilyPad(this.ctx);
            lilypad.draw();
        }
    }
}

module.exports = Scenery;