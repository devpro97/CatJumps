class PhisicalEngine extends Engine{
	constructor(dynamics, statics, scripts){
		super();

		this.dynamics = dynamics;
		this.statics = statics;
		this.gonnaWin = false;
		this.winHeigth = 0;
		this.scripts = scripts;
	}
	
	work(){
		super.work();
		this.proceedCustomScripts();
	}

	proceedDynamics(){
		this.dynamics.forEach(element => {
			element.accelerate(constants.GRAVITY);
			var collideAccel = element.jumpIfCollide(this.statics);
			if(collideAccel){
				element.stopSelfY();
				element.accelerate(collideAccel);
			}
			element.moveSelf();
		});
	}

	proceedStatics(){
		var botElemY = game.Player.Y - constants.CAT_MAX_HEIGTH + constants.FIELD_Y;
		this.deleteIfNeeded(this.statics, botElemY);
		
		var topElem = this.getTopElement(this.statics);
		var topElemY = topElem.Y;
		var minCreationHeigth = game.Player.Y - constants.RENDER_DISTANCE; 
		var maxCreationHeigth = game.Camera.y - constants.RENDER_DISTANCE; 
		if(topElemY > game.winCondition){
			this.createIfNeeded(this.statics, topElemY, minCreationHeigth, minCreationHeigth, maxCreationHeigth);
		}
		else{
			if(!this.gonnaWin){
				this.winHeigth = topElemY - 200;
				this.statics.push(game.factory.makeNewStatic(256, 100, 'flat',   300, this.winHeigth));
				this.statics.push(game.factory.makeNewStatic(133, 82, 'stormy', 355, this.winHeigth - 50));
				this.gonnaWin = true;
			}
		}
	}

	// Means, that lots of busines logics like a key handling will be
	// fully customable by adding them to phisical engine like an 
	// object, that contains it own variables and run(statics, dynamics)
	// method in order to proceed its logic
	proceedCustomScripts(){
		for (const key in this.scripts) {
			if (this.scripts.hasOwnProperty(key)) {
				this.scripts[key].run(this);
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
		return (game.Player.Y >= game.Camera.y + constants.FIELD_Y + 200);
	}
}

