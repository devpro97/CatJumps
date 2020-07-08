class Game{
    constructor(){
        this.winCondition = 10000;
        this.factory = new Factory();
        this.Statics = [];
        this.Dynamics = [];
        this.Player;
        this.Camera;
        this.Scripts = new CustomScripts();
        
        this.fps = 60;
        this.mainLoopDelay = 1000 / this.fps;
        
        this.graphicEngine = null;
        this.phisicalEngine = null;
        this.GraphicLoop = null;
        this.PhisicsLoop = null;
        
        this.frameCounter = new FramerateCounter();
    }
    startup(winCondition, catId = 'pursheen', bgId = 'day', hardness = 1){
        this.Dynamics.push(new Dynamic(0, 169, 105, catId,null, 300, 550));
        this.Player = this.Dynamics[0];
        this.Camera = new Camera(this.Player);
        this.winCondition = winCondition;
        new Scripts(); //adding scripts to this.scripts

        constants.GRAVITY.Yval *= (1 + hardness) / 2;
        constants.JUMP_SRENGTH.Yval *= (1 + hardness) / 2;
        constants.MIN_DISTANCE_BETWEEN_BLOCKS *= (1 + hardness) / 2;
        
        var ycoord = 725;
        this.Statics = [
            this.factory.makeNewStatic(256, 100, 'flat', 300, 700)
        ]
        while(ycoord > 0){
            ycoord -= constants.MIN_DISTANCE_BETWEEN_BLOCKS;
            var st = this.factory.makeRandomStatic('flat', ycoord);
            this.Statics.push(st);
        }

        this.graphicEngine = new GraphicEngine(ctx, this.Dynamics, this.Statics, this.Camera);
        this.graphicEngine.changeBackground(Pics[bgId], this.winCondition);
        
        this.phisicalEngine = new PhisicalEngine(this.Dynamics, this.Statics, this.Scripts.scripts);
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
    cutScene(){
        drawer.appear(3000, Pics['interest'].picture());
        setTimeout(() => {
            drawer.stop();
            drawer.fade(1000, "white");
            setTimeout(() => {
                drawer.stop();
            }, 1000);
        }, 4000);
    }
    gameWin(){
        this.pauseGame();
        drawer.appear(3000, Pics['happyEnd'].picture());    
    }
    gameOver(){
        this.pauseGame();
        drawer.appear(3000, Pics['falling'].picture());    
    }
}