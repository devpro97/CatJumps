class Engine{
	constructor(){}
	work(){
		this.proceedDynamics();
		this.proceedStatics();
	}	
}

class GraphicEngine extends Engine{
	constructor(context, backGround){
		super();
		this.ctx = context;
		this.kX = 1;
		this.kY = 1;
		this.backGround = backGround;
	}
	work(kX, kY){
		this.kX = kX;
		this.kY = kY;
		this.drawBackground();
		this.proceedStatics();
		this.proceedDynamics();
	}

	proceedStatics(){
		game.Platforms.forEach(element => {
			element.renderSelf(this.ctx, this.kX, this.kY);
		});
	}

	proceedDynamics(){
		game.Cat.renderSelf(this.ctx, this.kX, this.kY);
	}
	
	drawBackground(){
		this.ctx.drawImage(this.backGround.picture(), 0, 0, game.FIELD_X * this.kX, game.FIELD_Y * this.kY);
		if(game.frameCounter)
			game.frameCounter.framesCalled++;
	}
}

class PhisicalEngine extends Engine{
	constructor(){super();}

	proceedStatics = function(){
		var topElemY = game.FIELD_Y;

		game.Platforms.forEach(element => {
			element.Y += game.STATIC_SPEED;
			if(element.Y < topElemY)
				topElemY = element.Y;
			if(element.Y > game.FIELD_Y){
				var index = game.Platforms.indexOf(element);
				game.Platforms.splice(index, 1);
			}
		});
		if(topElemY > game.MIN_DISTANCE_BETWEEN_BLOCKS){
			game.Platforms.push(game.factory.makeRandomStatic('flat'));
		}
	}
	proceedDynamics(){
		var collideAccel = game.Cat.jumpIfCollide(game.Platforms);
		if(collideAccel){
			game.Cat.stopSelfY()
			game.Cat.accelerate(collideAccel);
		}
		if(isKeyRight){
			game.Cat.accelerate(game.ACCEL_LEFT);
		}
		if(isKeyLeft){
			game.Cat.accelerate(game.ACCEL_RIGTH);
		}
		if(!isKeyRight && !isKeyRight) {
			game.Cat.deccelerate(game.DECCELERATION);
		}
		game.Cat.accelerate(game.GRAVITY);
		game.Cat.moveSelf();
	}	
	
}