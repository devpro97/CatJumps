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

var game;

function newGameEasy(){
    clearButtons();
    game = new Game(-6500, 'pursheen', 'BG1');
    newGameStart();
}
function newGameNormal(){
    clearButtons();
    game = new Game(-20000, (Math.random() > 0.5) ? 'pursheen' : 'glasses', 'BG1', 2);
    newGameStart();
}
function newGameHard(){
    clearButtons();
    game = new Game(-50000, 'glasses', 'BG1', 3);
    newGameStart();
}
function clearButtons(){
    var elem = document.getElementById('buttons');
    elem.parentNode.removeChild(elem);
}
function newGameStart(){
    addKeyHandlers();
    game.startup();
    game.gameStart();
    setTimeout(() => {
        game.startGame();
    }, 5000);
}