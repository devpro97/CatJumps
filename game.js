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
        this.MIN_DISTANCE_BETWEEN_BLOCKS = 150;
        this.CAT_MAX_HEIGTH = 300;
        
        this.RENDER_DISTANCE = 800;
    }
}
class Game{
    constructor(winCondition, catSpriteId, bgId, hardness = 1){
        this.winCondition = winCondition;
        this.factory = new Factory();
        this.Platforms = [];
        this.Cat = catSpriteId;
        this.Stormy;
        this.Camera = new Camera();
        
        this.fps = 60;
        this.mainLoopDelay = 1000 / this.fps;
        
        this.graphicEngine = new GraphicEngine(ctx, Pics[bgId], this.winCondition, this.Camera);
        this.phisicalEngine = new PhisicalEngine();
        this.GraphicLoop = null;
        this.PhisicsLoop = null;
        
        this.frameCounter = new FramerateCounter();
        constants.GRAVITY.Yval *= (2 + hardness) / 3;
        constants.JUMP_SRENGTH.Yval *= (2 + hardness) / 3;
        constants.MIN_DISTANCE_BETWEEN_BLOCKS *= (1 + hardness) / 2;
    }
    startup(){
        this.Cat = new aCat(0, 169, 105, this.Cat, 300, 550);
//        this.Stormy = new aCat(1, 169, 105, 'stormy',  300, 550);

        var ycoord = 725;
        this.Platforms = [
            this.factory.makeNewStatic(256, 50, 'flat', 300, ycoord)
        ]
        while(ycoord > 0){
            ycoord -= constants.MIN_DISTANCE_BETWEEN_BLOCKS;
            var st = this.factory.makeRandomStatic('flat', ycoord);
            this.Platforms.push(st);
        }
    }
    startGame(){
        this.PhisicsLoop = setInterval(() => this.phisicsLoop(), this.mainLoopDelay);
        this.GraphicLoop = setInterval(() => this.graphicsLoop(), this.mainLoopDelay);
        this.frameCounter.start();
    }
    pauseGame(){
        clearInterval(this.GraphicLoop);
        clearInterval(this.PhisicsLoop);
        this.frameCounter.stop();
    }
    graphicsLoop() {
        var xK = windowResizer.getXcoef();
        var yK = windowResizer.getYcoef();
        this.graphicEngine.work(xK, yK);
    }
    phisicsLoop(){
        this.phisicalEngine.work();
        if(this.phisicalEngine.isCatFelt() == true){
            this.gameOver();
        }
    }
    gameStart(){
        picturer.appear(3000, Pics['interest'].picture());
        setTimeout(() => {
            picturer.stop();
            picturer.fade(1000, "white");
            setTimeout(() => {
                picturer.stop();
            }, 1000);
        }, 4000);
    }
    gameWin(){
        this.pauseGame();
        picturer.appear(3000, Pics['happyEnd'].picture());    
    }
    gameOver(){
        this.pauseGame();
        picturer.appear(3000, Pics['falling'].picture());    
    }
}