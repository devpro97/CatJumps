var pathToPictures = 'content';

class SpriteManager{
    constructor( sprites, timespan = 60000 ){
        this.collectLoop;
        this.delay = timespan;
        this.managedSprites = sprites;
    }
    start(){
        clearInterval( this.collectLoop );
        this.collectLoop = setInterval( () => this.cleanup(), this.delay );
    }
    stop(){
        clearInterval( this.collectLoop );
    }
    forceClean(){
        this.cleanup();
        this.start();
    }
    cleanup(){
        for( var index in this.managedSprites ){
            this.managedSprites[index].cleanup();
        };
    }
}

class Sprite{
    constructor(name, width, heigth, isLocal = true, lifetimeMs = 6000){
        this.width = width;
        this.heigth = heigth;

        this.src = (isLocal)
            ? pathToPictures + '/' + name
            : name;

        this.image = null;
        this.picture = this.initialize;

        this.lastUsedTime = this.now();
        this.lifetime = lifetimeMs;
    }

    //if picture is clear, initialise and loads it
    //otherwice returns picture
    picture(){}

    //if picture initialised and unused more than this.lifetime milliseconds, deleting image.
    //else does nothing; 
    cleanup(){}
    
    switchState(isActive){
        if(isActive == true){
            this.picture = this.getPicture;
            this.cleanup = this.deleteImageIfDeprecated;
        }
        else{
            this.picture = this.initialize;
            this.cleanup = () => {};
        }
        
    }
    
    getPicture(){
        this.lastUsedTime = this.now();
        return this.image;
    }

    deleteImageIfDeprecated(){
        if (this.image == null || this.now() - this.lastUsedTime <= this.lifetime){
            return false;
        }
        this.image.src = null;
        this.image = null;
        this.switchState(false);
        return true;
    }

    initialize(){
        this.image = new Image();
        this.image.src = this.src;
        this.switchState(true);
        return this.getPicture();        
    }

    now(){
        return new Date();
    }
}