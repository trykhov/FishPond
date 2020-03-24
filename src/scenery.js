const LilyPad = require("./lilypad");

function Scenery(ctx) {
    this.ctx = ctx;
}

Scenery.prototype.populate = function(object, num) {
    if(object instanceof LilyPad) {
        for(let i = 0; i < num; i++) {
            let lilypad = new LilyPad(this.ctx);
            lilypad.draw();
        }
    }
}

module.exports = Scenery;