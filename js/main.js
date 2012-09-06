/*
	By Yhoyhoj : twitter.com/yhoyhoj
*/

function randomHexa() {

	var hexa = ['A', 'B', 'C', 'D' ,'E', 'F'];

	var number = Math.round(Math.random()*(16-2)+1);

	if(number > 9) {
		number = hexa[number-10];
	}

	return number;
}
function randomColor() {
	var color = '#';
	for(var i =0; i < 6; i++){
		color+= randomHexa();
	}
	return color;
}
function init() {

	for(var i = 0; i < canvas.width/15; i++){

		var pp = new Square(Math.random()*canvas.width+1, Math.random()*canvas.height+1, 15+Math.random()*((100-15)+1), randomColor(), 0.5+Math.random(), false);
	}

	player = new Player(canvas.width/5, -25);
	player.render();

	var pp = new Square(Math.random()*canvas.width+1, Math.random()*canvas.height+1, 125-Math.random()*100, randomColor(), 0.5+Math.random(), true);

	for(var i = 0; i < canvas.width/192; i++){
		var mine = new Mine(Math.random()*canvas.width+1, Math.random()*canvas.height+1, 100-Math.random()*30, 0.5+Math.random());
	}
}
function drawArrow() {

	c.save();
	c.fillStyle = "black";
	c.translate(canvas.width/5-30, 10);
	c.rotate(Math.PI * -10 / 180);
	c.beginPath();
	c.moveTo(0, 90);
	c.lineTo(+25, 50);
	c.lineTo(-25, 50);
	c.fill();
	c.moveTo(-8, 50);
	c.lineTo(-12, 0)
	c.lineTo(+12, 0)
	c.lineTo(+8, 50);
	c.fill();
	c.font = "20px Impact";
	c.fillText('ICI', +35 - c.measureText('ICI').width/2, 20);
	c.restore();

	c.fillStyle = "black";
	c.fillRect(canvas.width/5-50, 0, 3, 55);
	c.fillRect(canvas.width/5-50, 20, 30, 3);
	c.fillRect(canvas.width/5-50, 45, 30, 3);

}
function onWin() {
	c.restore();
	c.fillStyle = "black";
	c.font = "70px Arial";
	c.fillText("You won !", canvas.width/2 - c.measureText("You won !").width/2, canvas.height/2 -70/2);
	c.font = "15px Arial";
	c.fillText("Et je pense que vous êtes le premier !", canvas.width/2 - c.measureText("Et je pense que vous êtes le premier !").width/2, canvas.height/2+10 -15/2);

}


var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");
var objects = [];
var player;
var seconds = new Date();
var left, right, up, space;
var started = false;
var win = false;

var menu = document.getElementById('menu');
menu.style.left = canvas.width/2-250+"px";
menu.style.top = canvas.height/2-250+"px";


document.onkeydown = function (evt) {

    onKeyDown(evt.keyCode);

};

document.onkeyup = function(evt) {

    onKeyUp(evt.keyCode);

};

document.getElementsByTagName('a')[0].onclick = function() {
	menu.style.opacity = 0;
	started = true;
};

init();

update();




function update() {

	if(window.webkitRequestAnimationFrame)
		webkitRequestAnimationFrame(update);

	else if(window.mozRequestAnimationFrame)
		mozRequestAnimationFrame(update);

	else if((window.msRequestAnimationFrame))
		msRequestAnimationFrame(update);
	else if(window.requestAnimationFrame)
		requestAnimationFrame(update);
	else
		setTimeout(update, 1000/40);


	c.fillStyle = "#FAFAED";
	c.shadowBlur=0;
	c.shadowOffsetX = -0;
	c.shadowOffsetY = 0;
	c.fillRect(0,0, canvas.width, canvas.height);
	c.fillStyle= "#FA4646"
	c.fillRect(canvas.width-15, 0, 5, canvas.height);

	drawArrow();

	for(var i = 0; i < objects.length; i++) {

		var p = objects[i];		
		p.tick();
	}
	
	if(started)
		player.tick();
	else {
		player.render();
	}

	if(win)
		onWin();

}

/* --- Changelog ----

*09/05/12
- Added Mines
- Pre-added parachute, to be finished
- Decided to submit this game to js13kgames


*09/04/12
- Better jump
- Added fantasy spawn sign
- Now easier
- Separated source code in several files for better understanding

*09/03/12 :
- First Release
- Slight fall speed inscrease

*/

