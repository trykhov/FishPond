/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/fish.js":
/*!*********************!*\
  !*** ./src/fish.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// will be our boid object\nclass Fish {\n    constructor(p5, color) {\n        this.p5 = p5; // p5 object\n        this.pos = p5.createVector(Math.random() * p5.width, Math.random() * p5.height);\n        this.acceleration = p5.createVector(0, 0);\n        this.velocity = p5.createVector(2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5));\n        this.r = 3; // ???\n        this.maxSpeed = 3;\n        this.maxAccel = 0.1;\n        this.color = this.p5.color(color);\n        // \n        this.baseSize = Math.floor(Math.random() * 17 + 10);\n        this.bodyLength = this.baseSize * Math.floor((Math.random() + 1) * 2);\n        this.body = new Array(this.bodyLength).fill({...this.pos});\n    }\n\n    swim(fishes) {\n        // this function will do the calculations of how the fish should behave in relation to the others\n        this.school(fishes);\n        // this updates the calculated values in the Fish properties\n        this.update();\n        // this will wrap the fish around if they swim off the canvas\n        this.stayInBounds();\n        // this will render the fishes on the screen\n        this.draw();\n    }\n\n    accelerate(force) {\n        // tells the fish how fast to swim away\n        this.acceleration.add(force);\n    }\n\n    stayInBounds() {\n        // like the lilypads, this is to make sure the fishes stay inside the canvas\n        let x = this.pos.x;\n        let y = this.pos.y;\n        let width = this.p5.width;\n        let height = this.p5.height;\n\n        if(x < 0) this.pos.x = width;\n        if(x > width) this.pos.x = 0;\n\n        if(y < 0) this.pos.y = height;\n        if(y > height) this.pos.y = 0;\n    }\n\n    // Rule #1: Separation\n    // this determines whether or not the fish should avoid collision\n    separate(fishes) {\n        // looks for nearby fishes and swims away\n        let separateCo = 100; // separation coefficient (will play around with)\n        let steer = this.p5.createVector(0,0);\n        let count = 0;\n        for(let i = 0; i < fishes.length; i++) {\n            // distance between this fish and the other fishes\n            let dummyVector = this.p5.createVector(this.pos.x, this.pos.y);\n            let distance = dummyVector.dist(fishes[i].pos);\n            // if they're too close\n            if((distance > 0) && (distance < separateCo)) {\n                let diffVector = this.p5.createVector(this.pos.x, this.pos.y);\n                let diff = diffVector.sub(fishes[i].pos);\n                // ??\n                diff.normalize();\n                diff.div(distance); // weigh the difference by the distance (how far means how much to steer)\n                steer.add(diff);\n                count += 1; // how many total steers tells gives a sense of crowdedness\n            }\n        }\n        if(count > 0) steer.div(count); // how strong of a steer by averaging the crowdedness\n        if(steer.mag() > 0) {\n            // steer is a vector, so the magnitude tells us how strong of a steer is needed\n            steer.normalize();\n            steer.mult(this.maxSpeed);\n            steer.sub(this.velocity); // go against the current velocity\n            steer.limit(this.maxAccel);\n        }\n        return steer;\n    }\n\n    // Rule #2: Align\n    // this determines the direction the fish should go to in relation to where the others are heading\n    align(fishes) {\n        let farthestDist = 300;\n        let sum = this.p5.createVector(0,0);\n        let count = 0;\n        for(let i = 0; i < fishes.length; i++) {\n            let dummyVector = this.p5.createVector(this.pos.x, this.pos.y);\n            let distance = dummyVector.dist(fishes[i].pos)\n            if((distance > 0) && (distance < farthestDist)) {\n                sum.add(fishes[i].velocity);\n                count += 1;\n            }\n        }\n        if(count > 0) {\n            sum.div(count); // average velocity\n            sum.normalize();\n            sum.mult(this.maxSpeed);\n            let steer = sum.sub(this.velocity); // determine direction to steer to group\n            steer.limit(this.maxAccel);\n            return steer;\n        } \n        return this.p5.createVector(0,0); // no need to steer towards them\n    }\n\n    // Rule #3: \n    // determines direction fish should swim towards to be with the group\n    cohesion(fishes) {\n        let farthestDist = 500;\n        let sum = this.p5.createVector(0,0);\n        let count = 0;\n        for(let i = 0; i < fishes.length; i++) {\n            let dummyVector = this.p5.createVector(this.pos.x, this.pos.y);\n            let distance = dummyVector.dist(fishes[i].pos);\n            if((distance > 0) && (distance < farthestDist)) {\n                sum.add(fishes[i].pos);\n                count += 1;\n            }\n        }\n        if(count > 0) {\n            sum.div(count);\n            return this.seek(sum);\n        }\n        return this.p5.createVector(0,0);\n    }\n\n    updateBody() {\n        this.body.unshift({...this.pos})\n        this.body.pop()\n    }\n\n    draw() {\n        let p = this.p5;\n        p.noStroke();\n        // a fish is made of ellipses as cross sections\n        this.body.forEach((b, index) => {\n            let size\n            if ( index < this.bodyLength / 6 ) {\n                size = this.baseSize + index * 1.8\n            } else {\n                size = this.baseSize * 2 - index\n            }\n            this.color.setAlpha(this.bodyLength - index);\n            p.fill(this.color);\n            p.ellipse(b.x, b.y, size, size)\n        })\n    }\n\n    // determine how fast to move towards a target\n    seek(target) {\n        let dummyVector = this.p5.createVector(target.x,target.y);\n        let desired = dummyVector.sub(this.pos);\n        desired.normalize();\n        desired.mult(this.maxSpeed)\n        // According to Reynold's, steering = desired - velocity\n        let steer = desired.sub(this.velocity);\n        steer.limit(this.maxAccel);\n        return steer;\n    }\n\n    // updates the properties after the 3 rules calculations\n    update() {\n        let mouse = this.p5.createVector(this.p5.mouseX, this.p5.mouseY);\n        let xBound = (5 < mouse.x) && (mouse.x < this.p5.width);\n        let yBound = (20 < mouse.y) && (mouse.y < this.p5.height - 50);\n        // fish will follow mouse\n        if(xBound && yBound) {\n            mouse.sub(this.pos);\n            mouse.setMag(0.5);\n            this.acceleration = mouse;\n        }\n        this.velocity.add(this.acceleration);\n        // speed limit\n        this.velocity.limit(this.maxSpeed)\n        this.pos.add(this.velocity); // update the position\n        this.acceleration.mult(0); // reset the acceleration\n        this.updateBody();\n    }\n\n\n    school(fishes) {\n        // apply the rules of flock simulation\n        let seperate = this.separate(fishes);\n        let align = this.align(fishes);\n        let group = this.cohesion(fishes);\n        // // randomly weigh these factors\n        let weights = [seperate.mult(2.5), align.mult(1), group.mult(1)]\n        // // add these to the acceleration\n        for(let i in weights) {\n            this.accelerate(weights[i]);\n        }\n    }\n};\n\nmodule.exports = Fish;\n\n//# sourceURL=webpack:///./src/fish.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Scenery = __webpack_require__(/*! ./scenery */ \"./src/scenery.js\");\nconst Lilypad = __webpack_require__(/*! ./lilypad */ \"./src/lilypad.js\");\nconst Fish = __webpack_require__(/*! ./fish */ \"./src/fish.js\");\nconst School = __webpack_require__(/*! ./school */ \"./src/school.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n  let pond = document.getElementById(\"pond\");\n  let audio = document.querySelector(\"audio\")\n  audio.style.display = \"none\";\n\n  let lilypad;\n  let scenery;\n  let school;\n  // p is a p5 object\n  const sketch = (p) => {\n    p.setup = function() {\n      let canvas = p.createCanvas(pond.offsetWidth, pond.offsetHeight);\n      canvas.parent('pond'); // put the canvas inside the pond container\n      lilypad = new Lilypad(p);\n      scenery = new Scenery(p);\n      const koiColors = [\"#FFD021\", \"#F2F3F4\", \"#F16323\", \"#E34427\"];\n      school = new School();\n      for(let i = 0; i < 15; i++) {\n        let randColor = koiColors[Math.floor(Math.random() * 4)];\n        let fish = new Fish(p, randColor);\n        school.addFish(fish);\n      }\n    };\n    \n    p.draw = function() {\n      p.clear();\n      school.swim();\n      scenery.populate(lilypad);\n    }\n  };\n\n  // audio sound\n  let soundOff = document.getElementById(\"volume-off\");\n  let soundOn = document.getElementById(\"volume-on\");\n  soundOff.addEventListener(\"click\", function() {\n    audio.play();\n    audio.muted = false;\n    soundOff.style.display = \"none\";\n    soundOn.style.display = \"inline\";\n  })\n\n  soundOn.addEventListener(\"click\", function() {\n    audio.muted = true;\n    soundOff.style.display = \"inline\";\n    soundOn.style.display = \"none\";\n  })\n\n  // animations\n  new p5(sketch, pond);\n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/lilypad.js":
/*!************************!*\
  !*** ./src/lilypad.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Lilypad {\n    constructor(p5) {\n        this.pos = p5.createVector(Math.random() * p5.width, Math.random() * p5.height);\n        this.radius = (Math.random() + 1)  * 30;\n        this.velocity = p5.createVector(2 * (Math.random() - 0.5), 2 * (Math.random() - 0.5));\n        this.angle = p5.PI + (7 * p5.PI / 8);\n        this.p5 = p5;\n        this.rotate = 0;\n    }\n\n    draw() {\n        let p = this.p5;\n        let d = this.radius * 2;\n        let angle = this.angle;\n        let r = this.radius;\n        // the translation below has shifted the location of the center\n        p.noStroke();\n        // lilypad stem\n        p.fill(\"green\");\n        p.arc(0, 0, d, d, 0, angle);\n        // lilypad white flower\n        p.fill(\"white\");\n        p.beginShape();\n        p.vertex(0.75 * r, 0);\n        p.vertex(0.25 * r, 0.25 * r);\n        p.vertex(0, 0.75 * r);\n        p.vertex(-0.25 * r, 0.25 * r);\n        p.vertex(-0.75 * r, 0);\n        p.vertex(-0.25 * r, -0.25 * r);\n        p.vertex(0, -0.75 * r);\n        p.vertex(0.25 * r, -0.25 * r);\n        p.endShape();\n\n        // pink flower\n        p.fill(\"pink\");\n        p.beginShape();\n        p.vertex(0.375 * r, 0);\n        p.vertex(0.25 * r, 0.25 * r);\n        p.vertex(0, 0.375 * r);\n        p.vertex(-0.25 * r, 0.25 * r);\n        p.vertex(-0.375 * r, 0);\n        p.vertex(-0.25 * r, -0.25 * r);\n        p.vertex(0, -0.375 * r);\n        p.vertex(0.25 * r, -0.25 * r);\n        p.endShape();\n        p.pop(); // end container of the push()\n    }\n\n    move() {\n        let p = this.p5;\n        this.pos.add(this.velocity);\n        let x = this.pos.x;\n        let y = this.pos.y;\n\n        if(x + this.radius < 0) {\n            this.pos.x = p.width;\n        } else if(x - this.radius > p.width) {\n            this.pos.x = 0;\n        }\n        if(y + this.radius < 0) {\n            this.pos.y = p.height;\n        } else if(y - this.radius > p.height) {\n            this.pos.y = 0;\n        }\n\n        p.push(); // saves the state and containers each element\n        this.rotate += 0.01;\n        p.translate(this.pos.x, this.pos.y);\n        p.ellipseMode(p.CENTER);\n        p.rotate(this.rotate);\n        \n        this.draw();\n    }\n}\n\nmodule.exports = Lilypad;\n\n//# sourceURL=webpack:///./src/lilypad.js?");

/***/ }),

/***/ "./src/scenery.js":
/*!************************!*\
  !*** ./src/scenery.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Lilypad = __webpack_require__(/*! ./lilypad */ \"./src/lilypad.js\");\n\nclass Scenery {\n    constructor(p5) {\n        this.canvasHeight = p5.height;\n        this.canvasWidth = p5.width;\n        this.p = p5;\n\n        this.lilypads = new Array(8);\n        for(let i = 0; i < this.lilypads.length; i++) {\n            this.lilypads[i] = new Lilypad(p5);\n        }\n    }\n\n    populate(obj) {\n        if(obj instanceof Lilypad) {\n            for(let i = 0; i < this.lilypads.length; i++) {\n                this.lilypads[i].move();\n            }\n        }\n    }\n\n    ripple() {\n\n    }\n}\n\nmodule.exports = Scenery;\n\n//# sourceURL=webpack:///./src/scenery.js?");

/***/ }),

/***/ "./src/school.js":
/*!***********************!*\
  !*** ./src/school.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction School() {\n    this.fishes = [];\n}\n\n// collect the fishes inside the school\nSchool.prototype.addFish = function(fish) {\n    this.fishes.push(fish);\n}\n\nSchool.prototype.swim = function() {\n    for(let i = 0; i < this.fishes.length; i++) {\n        this.fishes[i].swim(this.fishes);\n    }\n}   \n\n\nmodule.exports = School;\n\n//# sourceURL=webpack:///./src/school.js?");

/***/ })

/******/ });