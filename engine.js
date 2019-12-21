class Engine{
	constructor(){
	}
	work = function(){
		this.proceedStatics();
		this.proceedDynamics();
	}	
}

class GraphicEngine extends Engine{
	constructor(context){
		super();
		this.ctx = context;
		this.xK = 1;
		this.yK = 1;
	}
	work(xK, yK){
		this.xK = xK;
		this.yK = yK;
		this.drawBackground();
		super.work();
	}

	proceedStatics = function(){
		Statics.forEach(element => {
			element.renderSelf(this.ctx, this.xK, this.yK);
		});
	}

	proceedDynamics = function(){
		Dynamics.forEach(element => {
			element.renderSelf(this.ctx, this.xK, this.yK);
		});
	}
	
	drawBackground = function(){
		this.ctx.drawImage(Pics['BG'], 0, 0, 800 * this.xK, 800 * this.yK);
		if(frameCounter)
			frameCounter.framesCalled++;
	}
}

class PhisicalEngine extends Engine{
	constructor(){
		super();
	}
	proceedStatics = function(){
		Statics.forEach(element => {
			element.Y += 0.25;
		});
	}
	proceedDynamics = function(){
		Dynamics.forEach(element => {
			var collideAccel = element.jumpIfCollide(Statics);
			if(collideAccel){
				element.stopSelfY()
				element.accelerate(collideAccel);
			}
			if(isKeyRight){
				element.accelerate(ACCEL_LEFT);
			}
			if(isKeyLeft){
				element.accelerate(ACCEL_RIGTH);
			}
			if(!isKeyRight && !isKeyRight) {
				element.deccelerate();
			}
			element.accelerate(GRAVITY);
			element.moveSelf();
		});
	}	
	
}

function initOpjects(){
    addPic('flat',  'content/flat.png',     256, 50);
    addPic('pur',   'content/glasses.png',  506, 317);
    addPic('BG',    'content/BG.jpg',       600, 1422);

    this.Dynamics = [
        new ObjDynamic(0, 127, 80, 'pur')
    ];
    this.Statics = [
        new ObjStatic(0, 256, 50, 'flat', 450, 500),
        new ObjStatic(1, 256, 50, 'flat', 0, 700),
    ]

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

class FramerateCounter{
	constructor(){
		this.frameRating = 0;
		this.delay = 1000;
		this.fpsCounter = setInterval(this.frameCount, this.delay);
		this.framesCalled = 0;
	}
	
	stop = function(delay = 0){
		if(delay > 0){
			setTimeout(clearTimeout(this.fpsCounter), _delay);
		}
		else{
			clearTimeout(this.fpsCounter);
		}
	}
	start = function(delay = 1000){
		if(delay <= 0)
			this.delay = delay;
		setInterval(frameCount, this.delay);
	}

	frameCount = function() {
		if (this.delay == 1000){
			this.frameRating = this.framesCalled;
		}
		else{
			this.frameRating = this.framesCalled * this.delay / 1000;
		}
		this.framesCalled = 0;
	}
}

class WindowResizer{
	constructor(canva){
		this.frameX = canva.width;
		this.frameY = canva.height;
		this.baseFrameX = canva.width;
		this.baseFrameY = canva.height;
		this.windowToResize = canva;
		this.resizeTimer = null;
	}

	tryResize() {
		clearTimeout(this.resizeTimer);
		this.resizeTimer = setTimeout(WindowResizer.resizeToScreen, 250);
	}
	
	resizeToScreen = function() {
		var wh = Math.min(window.innerWidth, window.innerHeight);
		this.frameX = wh;
		this.frameY = wh;
		this.windowToResize.width = wh;
		this.windowToResize.height = wh;
	}
	
	getXcoef = function(){
		return this.frameX / this.baseFrameX
	}
	getYcoef = function(){
		return this.frameY / this.baseFrameY
	}
}