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
var picturer = new Picturer(ctx);
var spriteManager = new SpriteManager(Pics, 15000);
spriteManager.start();

var game = new Game();
var bgCount = 3;

function newGameEasy(){
    clearButtons();
    newGameStart(-6500, 'pursheen', randomBG(bgCount));
}
function newGameNormal(){
    clearButtons();
    newGameStart(-16000, (Math.random() > 0.5) ? 'pursheen' : 'glasses', randomBG(bgCount), 2);
}
function newGameHard(){
    clearButtons();
    newGameStart(-50000, 'glasses', randomBG(bgCount), 3);
}
function clearButtons(){
    var elem = document.getElementById('buttons');
    elem.parentNode.removeChild(elem);
}
function newGameStart(wincondition, catId, bgId, hardness){
    addKeyHandlers();
    game.startup(wincondition, catId, bgId, hardness);
    game.gameStart();
    setTimeout(() => {
        game.startGame();
    }, 5000);
}
function randomBG( bgCount ){
    var rndFloat = Math.random() * bgCount;
    return 'BG' + Math.ceil(rndFloat); 
}