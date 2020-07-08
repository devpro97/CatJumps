class Obj{
    constructor(id, width, heigth, X = 0, Y = 0, disposable = true){
        this.id = id;
        this.X = X;
        this.Y = Y;
        this.width = width;
        this.heigth = heigth;
        this.disposable = disposable;
        
        this.baseX = function() {
            return this.X + this.width / 2;
        }
        this.baseY = function() {
            return this.Y + this.heigth;
        }
    }
}
class SpritedObj extends Obj{
    constructor(id, width, heigth, picId, X = 0, Y = 0, disposable = true){
        super(id, width, heigth, X, Y, disposable)
        this.sprite = Pics[picId];
    }
}
class Static extends SpritedObj{
    constructor(id, width, heigth, picId, X = 0, Y = 0, disposable = true){
        super(id, width, heigth, picId, X, Y, disposable);
    }
}
class Dynamic extends SpritedObj{
    constructor(id, width, heigth, picId, speed = null, X = 0, Y = 0, disposable = true){
        super(id, width, heigth, picId, X, Y, disposable);
        this.speed = new Speed();
        if(speed)
            this.speed = speed;
        this.acceleration = new Acceleration();
    }
    moveSelf() {
        this.speed.accelerate(this.acceleration);
        this.acceleration = new Acceleration();
        this.X += this.speed.Xval;
        var newY = this.Y + this.speed.Yval;
        this.Y += this.speed.Yval;
    }
    accelerate(accel) {
        this.speed.accelerate(accel);
    }
    deccelerate(deccel) {
        if(this.speed.Xval > deccel){
            this.acceleration.Xval -= deccel;
            return;
        }
        if(this.speed.Xval < (0 - deccel)){
            this.acceleration.Xval += deccel;
            return;
        }
        if(Math.abs(this.speed.Xval) <= deccel){
            this.speed.Xval = 0;
            return;
        }
    }
    stopSelfX(){        
        this.speed.Xval = 0;
    }
    stopSelfY(){
        this.speed.Yval = 0;
    }
    jumpIfCollide(staticsList){
        var jumpStrength = null;
        var baseX = this.baseX();
        var baseY = this.baseY();
        var nextX = baseX + this.speed.Xval;
        var nextY = baseY + this.speed.Yval;
        staticsList.forEach(obstacle => {
            if (obstacle.X < nextX && (obstacle.X + obstacle.width) > nextX){
                var obstacleFacticY = obstacle.Y + Math.ceil(obstacle.heigth / 2);
                if (obstacleFacticY > baseY)
                {
                    //console.log('id=' + obstacle.id + ' FacticY=' + obstacleFacticY + ' nexty=' + nextY + ' baseY='+ this.baseY());
                    if(obstacleFacticY <= nextY)
                    {
                        jumpStrength = constants.JUMP_SRENGTH;
                    }
                }
            }
        });
        return jumpStrength;
    }
}