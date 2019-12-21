var canva = document.getElementById('canva');
var ctx = canva.getContext('2d');

var JUMP_SRENGTH = new Acceleration(0, -15);
var GRAVITY = new Acceleration(0, 0.5);
var ACCEL_RIGTH = new Acceleration(-0.5, 0);
var ACCEL_LEFT = new Acceleration(0.5, 0);
var NO_ACCELERATON = new Acceleration(0, 0);
var DECCELERATION = 0.3;

var Pics = [];
var Dynamics = [];
var Statics = [];

var fps = 60;
var mainLoopDelay = 1000 / fps;
var isKeyLeft = false;
var isKeyRight = false;

var graphicEngine = new GraphicEngine(ctx);
var phisicalEngine = new PhisicalEngine();
var MainLoop = setInterval(MAIN_LOOP, mainLoopDelay);

var windowResizer = new WindowResizer(canva);
var frameCounter = new FramerateCounter();

window.onload = initOpjects;
window.onresize = windowResizer.tryResize;
document.addEventListener("keydown", downHandler);
document.addEventListener("keyup", upHandler);
windowResizer.resizeToScreen();

function  MAIN_LOOP() {
	var xK = windowResizer.getXcoef();
	var yK = windowResizer.getYcoef();

	graphicEngine.work(xK, yK);
	phisicalEngine.work();
}
