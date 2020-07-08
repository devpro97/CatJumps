
class GraphicEngine extends Engine{
	constructor(context, dynamics, statics, camera){
		super();
		this.ctx = context;
		this.dynamics = dynamics;
		this.statics = statics;

		this.kX = 1;
		this.kY = 1;
		this.backGround = null;
		this.backGroundCoef = -1;
		this.camera = camera;
	}

	work(kX, kY){
		this.kX = kX;
		this.kY = kY;
		this.camera.followTarget();
		this.drawBackground();
		
		super.work();
	}

	changeBackground(backGround, worldHeight){
		this.backGround = backGround;
		this.backGroundCoef = backGround.heigth / Math.abs(worldHeight - backGround.width);
	}


	proceedStatics(){
		this.statics.forEach(element => {
			this.render(element);
		});
	}

	proceedDynamics(){
		this.dynamics.forEach(element => {
			this.render(element);
		});
	}
	
	drawBackground(){
		if(this.backGround.heigth > constants.FIELD_Y){
			var supposedSourceY = this.camera.y * this.backGroundCoef + this.backGround.heigth - this.backGround.width;
			var sourceY = Math.max(0, supposedSourceY);
			this.ctx.drawImage(this.backGround.picture(),
					0, sourceY, this.backGround.width, this.backGround.width / constants.FIELD_PROPORTION, 				//source
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