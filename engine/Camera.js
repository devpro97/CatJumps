class Camera{
    constructor(target){
        this.target = target;
        this.x = 0;
        this.y = 0;

        this.minX;
        this.minY;
        this.maxX;
        this.maxY;
    }
    followTarget(){
        var minCamHeigth = this.target.Y - constants.CAT_MAX_HEIGTH;
        if(minCamHeigth < this.y){
            this.y = minCamHeigth;
        }

        this.minX = this.x;
        this.minY = this.y;
        this.maxX = this.x + constants.FIELD_X;
        this.maxY = this.y + constants.FIELD_Y;    
    }
}