class FramerateCounter{
	constructor(){
		this.frameRating = 0;
		this.delay = 1000;
		this.framesCalled = 0;
		this.fpsCountTimer = null;
	}
	stop(delay = 0){
		if(delay > 0){
			setTimeout(clearTimeout(this.fpsCountTimer), delay);
		}
		else{
			clearTimeout(this.fpsCountTimer);
		}
	}
	start(_delay = 1000){
		if(_delay <= 0)
			this.delay = _delay;
        this.fpsCountTimer = setInterval(() => game.frameCounter.frameCount(), this.delay);
	}
	frameCount(){
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
		this.frameX = constants.FIELD_X;
		this.frameY = constants.FIELD_Y;
		this.baseFrameX = constants.FIELD_X;
		this.baseFrameY = constants.FIELD_Y;
		this.windowToResize = canva;
		this.resizeTimer = null;
	}

	tryResize(){
		clearTimeout(this.resizeTimer);
		this.resizeTimer = setTimeout(() => this.resizeToScreen(), 250);
	}
	
	resizeToScreen(){
		var wh = Math.min(window.innerWidth, window.innerHeight);
		this.frameX = wh;
		this.frameY = wh;
		this.windowToResize.width = wh;
		this.windowToResize.height = wh;
	}
	
	getXcoef(){
		return this.frameX / this.baseFrameX
	}
	getYcoef(){
		return this.frameY / this.baseFrameY
	}
}

class Factory{
	constructor(){
		this.dynId = 0;
		this.statId = 0;
		this.basicStatWidth = 256;
		this.basicStatHeight = 50;
	}
	makeRandomStatic(picId = 'flat', Y = 0){
		this.statId++;
		var rnd = Math.random();
		var x = rnd * (constants.FIELD_X - this.basicStatWidth);
		console.log('created id=' + this.statId + ' '+ picId + ' at x=' + x + ' y=' + Y);
		return new Platform(this.statId, this.basicStatWidth, this.basicStatHeight, picId, x, Y);
	}
	makeNewStatic(width, heigth, picId, X = 0, Y = 0){
		this.statId++;
		console.log('created id=' + this.statId+ ' ' + picId + ' at x=' + X + ' y=' + Y);
		return new Platform(this.statId, width, heigth, picId, X, Y);
	}
}


function addPics(){
    addPic('flat',              'flat.png',     256, 50);
    addPic('glasses',		    'glasses.png',  506, 317);
    addPic('pursheen',          'pursheen.png', 372, 229);
    addPic('BG1',               'night.jpg',    600, 1422);
    addPic('BG2',               'day.jpg',      600, 1422);
    addPic('falling',           'falling.png',  800, 800);
    addPic('happyEnd',          'happyEnd.png', 640, 640);
    addPic('interest',          'interest.png', 800, 800);
    addPic('stormy',          	'stormy.png',  	480, 335);
    function addPic(id, url, width, heigth){
        this.Pics[id] = new Sprite(url, width, heigth);
    }
}
function addKeyHandlers() {   
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("touchstart", handleTouch, false);
    window.addEventListener("touchend", handleUntouch, false);
}

function handleKeyDown(e) {
    if (e.key == "ArrowLeft"){
        isKeyLeft = true;
    }
    if (e.key == "ArrowRight"){
        isKeyRight = true;
    }
}
function handleKeyUp(e) {
    if (e.key == "ArrowLeft"){
        isKeyLeft = false;
    }
    if (e.key == "ArrowRight"){
        isKeyRight = false;
    }
}

function handleTouch(evt) {
    evt.preventDefault();
    var touch = evt.changedTouches[0];
    var halfWidth =  window.innerWidth / 2;
    if (touch.pageX <= halfWidth){
        isKeyLeft = true;
    }
    if (touch.pageX > halfWidth){
        isKeyRight = true;
    }
}
function handleUntouch(evt) {
    evt.preventDefault();
    isKeyLeft = false;
    isKeyRight = false;
}