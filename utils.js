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
        this.fpsCountTimer = setInterval(() => frameCounter.frameCount(), this.delay);
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
		var x = rnd * (FIELD_X - this.basicStatWidth);
		return new ObjStatic(this.statId, this.basicStatWidth, this.basicStatHeight, picId, x, Y);
	}
	makeNewStatic(width, heigth, picId, X = 0, Y = 0){
		this.statId++;
		return new ObjStatic(this.statId, width, heigth, picId, X, Y);
	}
}