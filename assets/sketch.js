var canvas;
var cubeColor = "#0E2B0E";
let x, y;
let w, h;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0, "fixed");
    canvas.style("z-index", "-1");
    x = width / 2;
    y = height;
}
  
function draw(){
    background("rgba(0,0,0,0)");
    drawGrid();
    stroke('rgba(0, 130, 0, 0.05)');
    noFill();
    line(x, y, random(-100, 100), random(-100, 100))
    x = x + random(-100, 100);
    y = y - 5;
    if (y < 0) {
        y = height;
    }
}

function drawWireframe(){
    noFill();
    stroke(cubeColor);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    translate(75, 75, 200);
    box(100, 100, 100);
}

function drawGrid() {
	for (let x=0; x < windowWidth; x+=50) {
        for (let y=0; y < windowHeight; y+=50){
        stroke(cubeColor);
		line(x, 0, x, height);
        line(0, y, width, y);
	    }
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight, WEBGL);
}