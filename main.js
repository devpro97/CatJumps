var canva = document.getElementById('canva');
var ctx = canva.getContext('2d');

var JUMP_SRENGTH = new Acceleration(0, -15);
var GRAVITY = new Acceleration(0, 0.5);
var ACCEL_RIGTH = new Acceleration(-0.5, 0);
var ACCEL_LEFT = new Acceleration(0.5, 0);
var NO_ACCELERATON = new Acceleration(0, 0);
var DECCELERATION = 0.3;

var STATIC_SPEED = 0.25;

var FIELD_X = 800;
var FIELD_Y = 800;
var MIN_DISTANCE_BETWEEN_BLOCKS = 150;

var factory = new Factory();
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
frameCounter.start();

window.onload = initOpjects;
window.onresize = () => windowResizer.tryResize();
document.addEventListener("keydown", downHandler);
document.addEventListener("keyup", upHandler);
windowResizer.resizeToScreen();

function  MAIN_LOOP() {
	var xK = windowResizer.getXcoef();
	var yK = windowResizer.getYcoef();

	graphicEngine.work(xK, yK);
	phisicalEngine.work();
}


function initOpjects(){
    addPic('flat',   'content/flat.png',     256, 50);
    addPic('purG',   'content/glasses.png',  506, 317);
    addPic('BG',     'content/BG.jpg',       600, 1422);

    this.Dynamics = [
        new ObjDynamic(0, 127, 80, 'purG', 300, 550)
	];
	var ycoord = 725;
    this.Statics = [
        factory.makeNewStatic(256, 50, 'flat', 300, ycoord)
	]
	while(ycoord>0){
		ycoord -= MIN_DISTANCE_BETWEEN_BLOCKS;
		var st = factory.makeRandomStatic('flat', ycoord);
		Statics.push(st);
	}

    function addPic(id, url, width, heigth){
        this.Pics[id] = new Image(width, heigth);
        this.Pics[id].src=url;
    }
}

function downHandler(e) {
    if (e.key == "ArrowLeft"){
        isKeyLeft = true;
    }
    if (e.key == "ArrowRight"){
        isKeyRight = true;
    }
}
function upHandler(e) {
    if (e.key == "ArrowLeft"){
        isKeyLeft = false;
    }
    if (e.key == "ArrowRight"){
        isKeyRight = false;
    }
}