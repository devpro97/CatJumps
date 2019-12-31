var canva = document.getElementById('canva');
var ctx = canva.getContext('2d');

var windowResizer = new WindowResizer(canva);
windowResizer.resizeToScreen();
window.onresize = () => windowResizer.tryResize();

var constants = new Constants();

var isKeyLeft = false;
var isKeyRight = false;
addKeyHandlers();

var Pics = [];
addPics();
var picturer = new Picturer(ctx);

var game = new Game();
game.startup();
game.gameStart();
setTimeout(() => {
    game.startGame();
}, 5000);