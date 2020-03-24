// const Scenery = require("./scenery");
// const LilyPad = require("./lilypad");
// const Fish = require("./fish");
// const School = require("./school");
const p5 = require("../p5/p5");

// document.addEventListener("DOMContentLoaded", function() {
    let canvas = document.querySelector('canvas');
//     let ctx = canvas.getContext('2d');
//     // removing the blur from the canvas lines
//     let dpi = window.devicePixelRatio;
//     let adjustHeight = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//     let adjustWidth = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
//     canvas.setAttribute("height", adjustHeight * dpi);
//     canvas.setAttribute("width", adjustWidth * dpi);
    
//     let scenery = new Scenery(ctx);

//     // populate the lilypads
//     let lilypad = new LilyPad(ctx);
//     scenery.populate(lilypad, 20);

//     // create the fishes
//     let school = new School();
//     // populate the school
//     for(let i = 0; i < 20; i++) {
//         let fish = new Fish(ctx);
//         school.addFish(fish);
//     }




//     // let fish = new Fish(ctx);
//     // fish.draw();
// })
 

const sketch = (p) => {
  console.log(p)
  p.setup = function() {
    let canvas = p.createCanvas(800, 400);
    canvas.parent('pond')
  };

  p.draw = function() {
    p.ellipse(50,50, 80,80)
  };
};


new p5(sketch, canvas);