var canva = document.getElementById('canva');
var ctx = canva.getContext('2d');

var windowResizer = new WindowResizer(canva);
windowResizer.resizeToScreen();
window.onresize = () => windowResizer.tryResize();

var isKeyLeft = false;
var isKeyRight = false;
addKeyHandlers();

var Pics = [];
addPics();

var game = new Game();
game.startup();
game.startGame();