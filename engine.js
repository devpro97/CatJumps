class Engine{
	constructor(){}
	work(){
		this.proceedDynamics();
		this.proceedStatics();
	}	
}

class GraphicEngine extends Engine{
	constructor(context, camera = new Camera()){
		super();
		this.ctx = context;
		this.kX = 1;
		this.kY = 1;
		this.backGround = null;
		this.backGroundCoef = 0;
		this.camera = camera;
	}

	changeBackground(backGround,  worldHeight){
		this.backGround = backGround.picture();
		this.backGroundCoef = 1;
		
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
		});
	}

	proceedDynamics(){
		this.render(game.Cat);
//		this.render(game.Stormy);
	}
	
	drawBackground(){
		if(this.backGround.heigth > constants.FIELD_Y){
			var sourceY = Math.max(0, this.backGround.heigth - constants.FIELD_Y + this.camera.y * this.backGroundCoef);
			this.ctx.drawImage(this.backGround.picture(), 
					0, sourceY, this.backGround.width, this.backGround.width, 	//source
					0, 0, constants.FIELD_X * this.kX, constants.FIELD_Y * this.kY);		//destination
		}
		else {
			this.ctx.drawImage(this.backGround.picture(), 
					0, 0, 
					constants.FIELD_X * this.kX, constants.FIELD_Y * this.kY);
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
	constructor(){
		super();
		this.gonnaWin = false;
		this.winHeigth = 0;
	}
	
	proceedDynamics(){
		game.Cat.accelerate(constants.GRAVITY);
		if(isKeyRight){
			game.Cat.accelerate(constants.ACCEL_LEFT);
		}
		if(isKeyLeft){
			game.Cat.accelerate(constants.ACCEL_RIGTH);
		}
		if(!isKeyRight && !isKeyRight) {
			game.Cat.deccelerate(constants.DECCELERATION);
		}
		var collideAccel = game.Cat.jumpIfCollide(game.Platforms);
		if(collideAccel){
			game.Cat.stopSelfY()
			game.Cat.accelerate(collideAccel);
		}
		game.Cat.moveSelf();

		if(this.gonnaWin){
			if(game.Cat.Y + game.Cat.heigth < this.winHeigth){
				if(game.Cat.X <= 556 && game.Cat.X >= 150);{
					game.gameWin();
				}
			}
		}
	}
	proceedStatics = function(){
		var botElemY = game.Cat.Y - constants.CAT_MAX_HEIGTH + constants.FIELD_Y;
		this.deleteIfNeeded(game.Platforms, botElemY);
		
		var topElem = this.getTopElement(game.Platforms);
		var topElemY = topElem.Y;
		var minCreationHeigth = game.Cat.Y - constants.RENDER_DISTANCE; 
		var maxCreationHeigth = game.Camera.y - constants.RENDER_DISTANCE; 
		if(topElemY > game.winCondition){
			this.createIfNeeded(game.Platforms, topElemY, minCreationHeigth, minCreationHeigth, maxCreationHeigth);
		}
		else{
			if(!this.gonnaWin){
				this.winHeigth = topElemY - 200;
				game.Platforms.push(game.factory.makeNewStatic(256, 50,  'flat',   300, this.winHeigth));
				game.Platforms.push(game.factory.makeNewStatic(169, 105, 'stormy', 333, this.winHeigth - 80));
				this.gonnaWin = true;
			}
		}
	}
	getTopElement(objects){
		var topElem;
		objects.forEach(element => {
			if(topElem == null)
				topElem = element;
			if(element.Y < topElem.Y)
				topElem = element;
		});
		return topElem;
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
		var nextBlockHeigth = topElemY - constants.MIN_DISTANCE_BETWEEN_BLOCKS
		if(nextBlockHeigth > minHeigth){//&& nextBlockHeigth > maxHeigth){
			var offset = 50 * (Math.random() - 0.5);
			objects.push(game.factory.makeRandomStatic('flat', nextBlockHeigth - offset));
		}
	}
	isCatFelt(){
		return (game.Cat.Y >= game.Camera.y + constants.FIELD_Y + 200);
	}
}