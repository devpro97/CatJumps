class Engine{
	constructor(){}
	work(){
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

	proceedStatics(){
		Statics.forEach(element => {
			element.renderSelf(this.ctx, this.xK, this.yK);
		});
	}

	proceedDynamics(){
		Dynamics.forEach(element => {
			element.renderSelf(this.ctx, this.xK, this.yK);
		});
	}
	
	drawBackground(){
		this.ctx.drawImage(Pics['BG'], 0, 0, 800 * this.xK, 800 * this.yK);
		if(frameCounter)
			frameCounter.framesCalled++;
	}
}

class PhisicalEngine extends Engine{
	constructor(){super();}
	proceedStatics = function(){
		Statics.forEach(element => {
			element.Y += 0.25;
		});
	}
	proceedDynamics(){
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