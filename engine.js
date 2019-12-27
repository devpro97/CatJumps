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
		this.kX = 1;
		this.kY = 1;
	}
	work(kX, kY){
		this.kX = kX;
		this.kY = kY;
		this.drawBackground();
		super.work();
	}

	proceedStatics(){
		Statics.forEach(element => {
			element.renderSelf(this.ctx, this.kX, this.kY);
		});
	}

	proceedDynamics(){
		Dynamics.forEach(element => {
			element.renderSelf(this.ctx, this.kX, this.kY);
		});
	}
	
	drawBackground(){
		this.ctx.drawImage(Pics['BG'], 0, 0, FIELD_X * this.kX, FIELD_Y * this.kY);
		if(frameCounter)
			frameCounter.framesCalled++;
	}
}

class PhisicalEngine extends Engine{
	constructor(){super();}

	proceedStatics = function(){
		var topElemY = FIELD_Y;

		Statics.forEach(element => {
			element.Y += STATIC_SPEED;
			if(element.Y < topElemY)
				topElemY = element.Y;
			if(element.Y > FIELD_Y){
				var index = Statics.indexOf(element);
				Statics.splice(index, 1);
			}
		});
		if(topElemY > MIN_DISTANCE_BETWEEN_BLOCKS){
			Statics.push(factory.makeRandomStatic('flat', ));
		}
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