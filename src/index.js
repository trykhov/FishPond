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
      const koiColors = ["#FFD021", "#F2F3F4", "#F16323", "#E34427"];
      school = new School();
      for(let i = 0; i < 20; i++) {
        let randColor = koiColors[Math.floor(Math.random() * 4)];
        let fish = new Fish(p, randColor);
        school.addFish(fish);
      }
    };
    
    p.draw = function() {
      p.clear();
      // school.swim();
      scenery.populate(lilypad);
    }
  };
  new p5(sketch, pond);
})
