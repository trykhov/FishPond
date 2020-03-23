document.addEventListener("DOMContentLoaded", function() {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    // removing the blur from the canvas lines
    let dpi = window.devicePixelRatio;
    let adjustHeight = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let adjustWidth = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    canvas.setAttribute("height", adjustHeight * dpi);
    canvas.setAttribute("width", adjustWidth * dpi);

    drawFish(ctx);
})
 
function drawFish(ctx) {
    // console.log(ctx)
    let x = Math.random() * ctx.canvas.width;
    let y = Math.random() * ctx.canvas.height;
    ctx.beginPath();
    ctx.ellipse(x, y, 45, 10, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
}