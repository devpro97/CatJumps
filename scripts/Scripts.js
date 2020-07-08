class Scripts{
    constructor(){
        game.Scripts.add('keyHandle', this.keyHandle);
        game.Scripts.add('beWinning', this.beWinning);
    }
    
    keyHandle(phisics){
        if(isKeyRight){
            game.Player.accelerate(constants.ACCEL_LEFT);
        }
        if(isKeyLeft){
            game.Player.accelerate(constants.ACCEL_RIGTH);
        }
        if(!isKeyRight && !isKeyLeft) {
            game.Player.deccelerate(constants.DECCELERATION);
        }    
    }
    beWinning(phisics){
        if(phisics.gonnaWin){
            if(game.Player.Y + game.Player.heigth < phisics.winHeigth){
                if(game.Player.X <= 556 && game.Player.X >= 150){
                    game.gameWin();
                }
            }
        }
    }
}