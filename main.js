var canva = document.getElementById('canva');
var ctx = canva.getContext('2d');

var constants = new Constants();
var windowResizer = new WindowResizer(canva);
windowResizer.resizeToScreen();
window.onresize = () => windowResizer.tryResize();


var isKeyLeft = false;
var isKeyRight = false;

var Pics = [];
addPics();
var drawer = new Drawer(ctx);
var spriteManager = new SpriteManager(Pics, 15000);
spriteManager.start();

var game = new Game();
var bgCount = 3;

function newGameEasy(){
    newGameStart(-6500, 'pursheen', randomBG(bgCount));
    clearButtons();
}
function newGameNormal(){
    newGameStart(-16000, (Math.random() > 0.5) ? 'pursheen' : 'glasses', randomBG(bgCount), 2);
    clearButtons();
}
function newGameHard(){
    newGameStart(-50000, 'glasses', randomBG(bgCount), 3);
    clearButtons();
}
function clearButtons(){
    var elem = document.getElementById('buttons');
    elem.parentNode.removeChild(elem);
}
function newGameStart(wincondition, catId, bgId, hardness){
    addKeyHandlers();
    game.startup(wincondition, catId, bgId, hardness);
    if(noIntro()){
        game.startGame();
    }
    else{
        game.cutScene();
        setTimeout(() => {
            game.startGame();
        }, 5000);
    }
}
function noIntro(){
    return document.getElementById("noIntro").checked;
}
function randomBG( bgCount ){
    var rndFloat = Math.random() * bgCount;
    return 'BG' + Math.ceil(rndFloat); 
}