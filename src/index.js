const Scenery = require("./scenery");
const Lilypad = require("./lilypad");
const Fish = require("./fish");
// const School = require("./school");
const p5 = require("../p5/p5");

document.addEventListener("DOMContentLoaded", function() {
  let pond = document.getElementById("pond");
  let fish;
  let lilypad;
  let scenery;
  // p is a p5 object
  const sketch = (p) => {
    p.setup = function() {
      let canvas = p.createCanvas(pond.offsetWidth, pond.offsetHeight);
      canvas.parent('pond'); // put the canvas inside the pond container
      fish = new Fish(p);
      lilypad = new Lilypad(p);
      scenery = new Scenery(p);
    };
    
    p.draw = function() {
      p.clear();
      scenery.populate(lilypad);
    }
  };
  new p5(sketch, pond);
})
