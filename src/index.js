const Scenery = require("./scenery");
const Lilypad = require("./lilypad");
const Fish = require("./fish");
const School = require("./school");
const p5 = require("../p5/p5");

document.addEventListener("DOMContentLoaded", function() {
  let pond = document.getElementById("pond");
  // let fish;
  let lilypad;
  let scenery;
  let school;
  // p is a p5 object
  const sketch = (p) => {
    p.setup = function() {
      let canvas = p.createCanvas(pond.offsetWidth, pond.offsetHeight);
      canvas.parent('pond'); // put the canvas inside the pond container
      lilypad = new Lilypad(p);
      scenery = new Scenery(p);

      school = new School();
      for(let i = 0; i < 30; i++) {
        let fish = new Fish(p);
        school.addFish(fish);
      }
      // school.fishes[0].school(school.fishes)
    };
    
    p.draw = function() {
      p.clear();
      school.swim();
      // scenery.populate(lilypad);
    }
  };
  new p5(sketch, pond);
})
