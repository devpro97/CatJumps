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
		this.frameX = canva.width;
		this.frameY = canva.height;
		this.baseFrameX = canva.width;
		this.baseFrameY = canva.height;
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
		var x = rnd * (game.FIELD_X - this.basicStatWidth);
		return new Platform(this.statId, this.basicStatWidth, this.basicStatHeight, picId, x, Y);
	}
	makeNewStatic(width, heigth, picId, X = 0, Y = 0){
		this.statId++;
		return new Platform(this.statId, width, heigth, picId, X, Y);
	}
}


function addPics(){
    addPic('flat',              'flat.png',     256, 50);
    addPic('purWithGlasses',    'glasses.png',  506, 317);
    addPic('pursheen',          'pursheen.png', 506, 317);
    addPic('BG1',               'night.jpg',    600, 1422);
    addPic('BG2',               'day.jpg',      600, 1422);
    function addPic(id, url, width, heigth){
        this.Pics[id] = new Sprite(url, width, heigth);
    }
}
function addKeyHandlers() {   
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canva.addEventListener("touchstart", handleTouch, false);
    canva.addEventListener("touchend", handleUntouch, false);
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
    var halfWidth =  document.width/2;
    if (touch.pageX <= halfWidth){
        isKeyLeft = false;
    }
    if (touch.pageX > halfWidth){
        isKeyRight = false;
    }
}
function handleUntouch(evt) {
    evt.preventDefault();
    isKeyLeft = false;
    isKeyRight = false;
}