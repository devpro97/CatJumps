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