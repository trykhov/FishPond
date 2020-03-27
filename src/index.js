const Scenery = require("./scenery");
const Lilypad = require("./lilypad");
const Fish = require("./fish");
const School = require("./school");

document.addEventListener("DOMContentLoaded", function() {
  let pond = document.getElementById("pond");
  let audio = document.querySelector("audio")
  audio.style.display = "none";

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
      for(let i = 0; i < 15; i++) {
        let randColor = koiColors[Math.floor(Math.random() * 4)];
        let fish = new Fish(p, randColor);
        school.addFish(fish);
      }
    };
    
    p.draw = function() {
      p.clear();
      school.swim();
      scenery.populate(lilypad);
    }
  };

  // audio sound
  let soundOff = document.getElementById("volume-off");
  let soundOn = document.getElementById("volume-on");
  soundOff.addEventListener("click", function() {
    audio.play();
    audio.muted = false;
    soundOff.style.display = "none";
    soundOn.style.display = "inline";
  })

  soundOn.addEventListener("click", function() {
    audio.muted = true;
    soundOff.style.display = "inline";
    soundOn.style.display = "none";
  })

  // animations
  new p5(sketch, pond);
})
