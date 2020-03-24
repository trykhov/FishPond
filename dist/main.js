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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Scenery = __webpack_require__(/*! ./scenery */ \"./src/scenery.js\");\nconst LilyPad = __webpack_require__(/*! ./lilypad */ \"./src/lilypad.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n    let canvas = document.querySelector('canvas');\n    let ctx = canvas.getContext('2d');\n    // removing the blur from the canvas lines\n    let dpi = window.devicePixelRatio;\n    let adjustHeight = getComputedStyle(canvas).getPropertyValue(\"height\").slice(0, -2);\n    let adjustWidth = getComputedStyle(canvas).getPropertyValue(\"width\").slice(0, -2);\n    canvas.setAttribute(\"height\", adjustHeight * dpi);\n    canvas.setAttribute(\"width\", adjustWidth * dpi);\n    \n    let lilypad = new LilyPad(ctx);\n    let scenery = new Scenery(ctx, lilypad);\n    scenery.populate(20);\n    // lilypad.draw(ctx);\n})\n \n\n\n// function drawFish(ctx) {\n//     // console.log(ctx)\n//     let x = Math.random() * ctx.canvas.width;\n//     let y = Math.random() * ctx.canvas.height;\n//     ctx.beginPath();\n//     ctx.ellipse(x, y, 45, 10, Math.PI / 4, 0, 2 * Math.PI);\n//     ctx.stroke();\n// }\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/lilypad.js":
/*!************************!*\
  !*** ./src/lilypad.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function LilyPad(ctx) {\n    this.ctx = ctx;\n    this.x = Math.random() * ctx.canvas.width;\n    this.y = Math.random() * ctx.canvas.height;\n    this.radius = (Math.random() + 5) * 10;\n}\n\nLilyPad.prototype.draw = function() {\n    let ctx = this.ctx;\n    let x = this.x;\n    let y = this.y;\n    let radius = this.radius;\n    // will consist of two semi-circles that share the same center\n\n    // draw a semi-circle and place on the canvas\n    // these are used in both\n\n    // first semicircle\n    ctx.beginPath();\n    // ctx.translate(x, y); \n    // ctx.rotate(Math.random() * Math.PI / 4);\n    ctx.arc(x, y, radius, 0, Math.PI);\n    ctx.fillStyle = 'green';\n    ctx.fill();\n    ctx.stroke();\n    ctx.closePath();\n    \n    // second semicircle\n    let startAngle2 = Math.PI / 2;\n    let endAngle2 = (Math.random() * Math.PI / 2) + startAngle2 +  Math.PI;\n    ctx.beginPath();\n    // ctx.rotate(Math.random() * Math.PI / 4);\n    ctx.arc(x, y, radius, startAngle2, endAngle2);\n    ctx.fillStyle = 'green';\n    ctx.fill();\n    ctx.stroke();\n    ctx.closePath();\n}\n\nLilyPad.prototype.rotate = function() {\n\n}\n\nmodule.exports = LilyPad;\n\n//# sourceURL=webpack:///./src/lilypad.js?");

/***/ }),

/***/ "./src/scenery.js":
/*!************************!*\
  !*** ./src/scenery.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const LilyPad = __webpack_require__(/*! ./lilypad */ \"./src/lilypad.js\");\n\nfunction Scenery(ctx, object) {\n    this.object = object;\n    this.ctx = ctx;\n}\n\nScenery.prototype.populate = function(num) {\n    if(this.object instanceof LilyPad) {\n        for(let i = 0; i < num; i++) {\n            let lilypad = new LilyPad(this.ctx);\n            lilypad.draw();\n        }\n    }\n}\n\nmodule.exports = Scenery;\n\n//# sourceURL=webpack:///./src/scenery.js?");

/***/ })

/******/ });