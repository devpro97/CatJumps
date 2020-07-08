class Constants{
    constructor(){
        this.JUMP_SRENGTH = new Acceleration(0, -15);
        this.GRAVITY = new Acceleration(0, 0.5);
        this.ACCEL_RIGTH = new Acceleration(-0.5, 0);
        this.ACCEL_LEFT = new Acceleration(0.5, 0);
        this.NO_ACCELERATON = new Acceleration(0, 0);
        this.DECCELERATION = 0.3;

        this.FIELD_X = 800;
        this.FIELD_Y = 800;
        this.FIELD_PROPORTION = this.FIELD_X / this.FIELD_Y;
        
        this.MIN_DISTANCE_BETWEEN_BLOCKS = 150;
        this.CAT_MAX_HEIGTH = 300;
        
        this.RENDER_DISTANCE = 800;
    }
}