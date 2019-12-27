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