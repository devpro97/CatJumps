class Obj{
    constructor(id, width, heigth, picId, X = 0, Y = 0){
        this.id = id;
        this.X = X;
        this.Y = Y;
        this.width = width;
        this.heigth = heigth;
        this.text = Pics[picId];
        this.baseX = function() {
            return (this.X + this.width/2) 
        }
        this.baseY = function() {
            return this.Y + this.heigth;
        }
    }
    renderSelf = function(context, xCoef, yCoef) {
        context.drawImage(this.text, this.X * xCoef, this.Y * yCoef, this.width * xCoef, this.heigth * yCoef);
    }
}
class ObjStatic extends Obj{
    constructor(id, width, heigth, picId, X = 0, Y = 0){
        super(id, width, heigth, picId, X, Y);
    }
}
class ObjDynamic extends Obj{
    constructor(id, width, heigth, picId, X = 0, Y = 0, speed = null){
        super(id, width, heigth, picId, X, Y);
        this.speed = new Speed();
        if(speed)
            this.speed = speed;
        this.acceleration = new Acceleration();
    }
    moveSelf = function() {
        this.speed.accelerate(this.acceleration);
        this.acceleration = new Acceleration();
        this.X += this.speed.Xval;
        this.Y += this.speed.Yval;
    }
    accelerate = function(accel) {
        this.speed.accelerate(accel);
    }
    deccelerate = function() {
        if(this.speed.Xval > 0){
            this.acceleration.Xval -= DECCELERATION;
            return;
        }
        if(this.speed.Xval < 0){
            this.acceleration.Xval += DECCELERATION;
            return;
        }
        if(Math.abs(this.speed.Xval) <= DECCELERATION){
            this.speed.Xval = 0;
            return;
        }
    }
    stopSelfX = function() {        
        this.speed.Xval = 0;
    }
    stopSelfY = function() {        
        this.speed.Yval = 0;
    }
    jumpIfCollide = function(staticsList){
        var jumpStrength = null;
        var nextX = this.baseX() + this.speed.Xval;
        var nextY = this.baseY() + this.speed.Yval;
        staticsList.forEach(obstacle => {
            if (obstacle.X < nextX && (obstacle.X + obstacle.width) > nextX){
                var obstacleFacticY = obstacle.Y + Math.ceil(obstacle.heigth / 2);
                if (obstacleFacticY > this.baseY() && obstacleFacticY < nextY){
                    jumpStrength = JUMP_SRENGTH;
                }
            }
        });
        return jumpStrength;
    }
}
class Speed{
    constructor(Xval = 0, Yval = 0){
        this.Xval = Xval;
        this.Yval = Yval;
    }
    accelerate = function(accel){
        this.Xval += accel.Xval;
        this.Yval += accel.Yval;
    }
}
class Acceleration extends Speed{}