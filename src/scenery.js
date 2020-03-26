const Lilypad = require("./lilypad");

class Scenery {
    constructor(p5) {
        this.canvasHeight = p5.height;
        this.canvasWidth = p5.width;
        this.p = p5;

        this.lilypads = new Array(5);
        for(let i = 0; i < this.lilypads.length; i++) {
            this.lilypads[i] = new Lilypad(p5);
        }
    }

    populate(obj) {
        if(obj instanceof Lilypad) {
            for(let i = 0; i < this.lilypads.length; i++) {
                this.lilypads[i].move();
            }
        }
    }

    ripple() {

    }
}

module.exports = Scenery;