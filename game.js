class Game{
    constructor(){
        this.JUMP_SRENGTH = new Acceleration(0, -15);
        this.GRAVITY = new Acceleration(0, 0.5);
        this.ACCEL_RIGTH = new Acceleration(-0.5, 0);
        this.ACCEL_LEFT = new Acceleration(0.5, 0);
        this.NO_ACCELERATON = new Acceleration(0, 0);
        this.DECCELERATION = 0.3;

        this.STATIC_SPEED = 1;

        this.FIELD_X = 800;
        this.FIELD_Y = 800;
        this.MIN_DISTANCE_BETWEEN_BLOCKS = 150;
        this.CAT_MAX_HEIGTH = 300;

        this.factory = new Factory();
        this.Platforms = [];
        this.Cat;

        this.fps = 60;
        this.mainLoopDelay = 1000 / this.fps;
        
        this.graphicEngine = new GraphicEngine(ctx, Pics['BG1']);
        this.phisicalEngine = new PhisicalEngine();
        this.GraphicLoop = null;
        this.PhisicsLoop = null;

        this.frameCounter = new FramerateCounter();
    }
    startup(){
        this.Cat = new aCat(0, 127, 80, 'pursheen', 300, 550);
        var ycoord = 725;
        this.Platforms = [
            this.factory.makeNewStatic(256, 50, 'flat', 300, ycoord)
        ]
        while(ycoord > 0){
            ycoord -= this.MIN_DISTANCE_BETWEEN_BLOCKS;
            var st = this.factory.makeRandomStatic('flat', ycoord);
            this.Platforms.push(st);
        }
    }
    startGame(){
        this.GraphicLoop = setInterval(() => this.graphicsLoop(), this.mainLoopDelay);
        this.PhisicsLoop = setInterval(() => this.phisicsLoop(), this.mainLoopDelay);
        this.frameCounter.start();
    }
    pauseGame(){
        clearInterval(GraphicLoop);
        clearInterval(PhisicsLoop);
        this.frameCounter.stop();
    }
    graphicsLoop() {
        var xK = windowResizer.getXcoef();
        var yK = windowResizer.getYcoef();
        this.graphicEngine.work(xK, yK);
    }
    phisicsLoop(){
        this.phisicalEngine.work();
    }
}