class Drawer{
    constructor(context){
        this.ctx = context;
        this.drawingCallback;
    }
    fade(fadingTimeMs, colour){
        clearInterval(this.drawingCallback);
        var times = fadingTimeMs / game.fps;
        var fadeStep = 0.05 / times;
        var fadeValue = 0;  
        this.drawingCallback = setInterval(() => {
            fadeValue += fadeStep;
            this.fill(colour, fadeValue);
        }, game.mainLoopDelay);
        setTimeout(() => {
            clearInterval(this.drawingCallback);
            this.drawingCallback = setInterval(() => {
                this.fill(colour);
            });
        }, fadingTimeMs);
    }
    appear(appearingTimeMs, picture){
        clearInterval(this.drawingCallback);
        var times = appearingTimeMs / game.fps;
        var alphaStep = 0.05 / times;
        var alpha = 0;  
        this.drawingCallback = setInterval(() => {
            alpha += alphaStep;
            this.draw(picture, alpha);
        }, game.mainLoopDelay);
        setTimeout(() => {
            clearInterval(this.drawingCallback);
            this.drawingCallback = setInterval(() => {
                this.draw(picture);
            });
        }, appearingTimeMs);
    }
    fill(colour, alpha = 1){
        this.ctx.globalAlpha = alpha;
        ctx.fillStyle = colour;
        ctx.fillRect(0, 0, canva.width, canva.height);
        this.ctx.globalAlpha = 1;
    }
    draw(picture, alpha = 1){
        this.ctx.globalAlpha = alpha;
        this.ctx.drawImage(picture, 0, 0, canva.width, canva.height);
        this.ctx.globalAlpha = 1;
    }
    start(){
        clearInterval(this.drawingCallback);
        drawingCallback = setInterval(() => {
            this.ctx.globalAlpha = 1;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canva.width, canva.height);
        }, game.mainLoopDelay);
    }
    stop(){
        clearInterval(this.drawingCallback);
    }
}