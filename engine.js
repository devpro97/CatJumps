class Engine{
	constructor(){}
	work(){
		this.proceedDynamics();
		this.proceedStatics();
	}	
}

class GraphicEngine extends Engine{
	constructor(context, backGround, camera = new Camera()){
		super();
		this.ctx = context;
		this.kX = 1;
		this.kY = 1;
		this.backGroundCoef = 1/5;
		this.backGround = backGround;
		this.camera = camera;
	}
	work(kX, kY){
		this.kX = kX;
		this.kY = kY;
		this.camera.prepareCamera();
		this.drawBackground();
		this.proceedStatics();
		this.proceedDynamics();
	}

	proceedStatics(){
		game.Platforms.forEach(element => {
			this.render(element);
		// 	var screenX = (element.X - this.camera.x) * this.kX;
		// 	var screenY = (element.Y - this.camera.Y) * this.kY;
		// 	this.ctx.drawImage(element.sprite.picture(), 
		// 						0, 0, element.sprite.width, element.sprite.heigth, 	//source
		// 						screenX, screenY, element.width * this.kX, element.heigth * this.kY);	//destination
		});
	}

	proceedDynamics(){
		this.render(game.Cat);
	}
	
	drawBackground(){
		if(this.backGround.heigth > game.FIELD_Y){
			var sourceY = this.backGround.heigth - game.FIELD_Y + this.camera.y * this.backGroundCoef;
			this.ctx.drawImage(this.backGround.picture(), 
			0, sourceY, this.backGround.width, this.backGround.width, 	//source
			0, 0, game.FIELD_X * this.kX, game.FIELD_Y * this.kY);		//destination
		}
		else {
			this.ctx.drawImage(this.backGround.picture(), 
			0, 0, 
			game.FIELD_X * this.kX, game.FIELD_Y * this.kY);
		}
		if(game.frameCounter)
		game.frameCounter.framesCalled++;
	}
	render(object) {
		var screenX = (object.X - this.camera.x) * this.kX;
		var screenY = (object.Y - this.camera.y) * this.kY;
		this.ctx.drawImage(object.sprite.picture(), 
		0, 0, object.sprite.width, object.sprite.heigth, 					//source
		screenX, screenY, object.width * this.kX, object.heigth * this.kY);	//destination
    }
}

class PhisicalEngine extends Engine{
	constructor(){super();}
	
	proceedDynamics(){
		game.Cat.accelerate(game.GRAVITY);
		if(isKeyRight){
			game.Cat.accelerate(game.ACCEL_LEFT);
		}
		if(isKeyLeft){
			game.Cat.accelerate(game.ACCEL_RIGTH);
		}
		if(!isKeyRight && !isKeyRight) {
			game.Cat.deccelerate(game.DECCELERATION);
		}
		var collideAccel = game.Cat.jumpIfCollide(game.Platforms);
		if(collideAccel){
			game.Cat.stopSelfY()
			game.Cat.accelerate(collideAccel);
		}
		game.Cat.moveSelf();
	}
	proceedStatics = function(){
		var botElemY = game.Cat.Y - game.CAT_MAX_HEIGTH + game.FIELD_Y;
		this.deleteIfNeeded(game.Platforms, botElemY);
		
		var topElemY = this.getTopElementY(game.Platforms);
		var minCreationHeigth = game.Cat.Y - game.RENDER_DISTANCE; 
		var maxCreationHeigth = game.Camera.y - game.RENDER_DISTANCE; 
		this.createIfNeeded(game.Platforms, topElemY, minCreationHeigth, minCreationHeigth, maxCreationHeigth);
	}
	getTopElementY(objects){
		var topElemY = 0;
		objects.forEach(element => {
			if(element.Y < topElemY)
			topElemY = element.Y;
		});
		return topElemY;
	}
	deleteIfNeeded(objects, lowerLevel){
		objects.forEach(element => {
			if(element.Y > lowerLevel){
				var index = objects.indexOf(element);
				objects.splice(index, 1);			
			}
		});
	}
	createIfNeeded(objects, topElemY, minHeigth, maxHeigth){
		var nextBlockHeigth = topElemY - game.MIN_DISTANCE_BETWEEN_BLOCKS
		if(nextBlockHeigth > minHeigth){//&& nextBlockHeigth > maxHeigth){
			var offset = 50 * (Math.random() - 0.5);
			objects.push(game.factory.makeRandomStatic('flat', nextBlockHeigth - offset));
		}
	}
	isCatFelt(){
		return (game.Cat.Y >= game.Camera.y + game.FIELD_Y + 200);
	}
}