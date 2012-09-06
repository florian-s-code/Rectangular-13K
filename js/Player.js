/*
	By Yhoyhoj : twitter.com/yhoyhoj
*/

function Player(x,y){

	this.startX = x;
	this.startY = y;
	this.x = x;
	this.y = y;
	this.up = -50;
	this.rotate = 0;
	this.parachute = 100;	
}
Player.prototype.render = function() {

	c.save();

	c.translate(this.x, this.y);
	if(this.rotate != 0)
	{
		c.rotate(Math.PI * this.rotate / 180);
		this.rotate = 0;
	}
	c.fillStyle = "red";
	c.shadowBlur=7;
	c.shadowOffsetX = -2;
	c.shadowOffsetY = 2;
	c.fillRect(0, 0, 10, 20);

	c.restore();
}
Player.prototype.renderParachute = function() {

	c.strokeStyle = "red";
	c.moveTo(this.x, this.y);
	c.lineTo(this.x-10, this.y-20);
	c.moveTo(this.x+10, this.y);
	c.lineTo(this.x+20, this.y-20);
	c.stroke();

	c.strokeStyle = "red";
	c.beginPath();
	c.arc(this.x+5, this.y-20, 20, Math.PI, 2*Math.PI);
	c.lineTo(this.x-15, this.y-20);
	c.stroke();
}
Player.prototype.tick = function() {

	var fall = true;
	var speed;

	if(this.x > canvas.width-10)
		win = true;

	if(this.x < -10) {
		this.x = this.startX;
		this.y = this.startY;
	}
	else if(this.y > canvas.height)
		this.y = -20;

	for(var i = 0; i < objects.length; i++) {
		var p = objects[i];
		p.player = false;

//			Squares :

		if(p instanceof Square)	{

			if(this.x > p.x-10 && this.x < p.x + p.size ){

				if(this.y+20 < p.y+1 && this.y+20 > p.y-2){
					p.player = true;
					speed = p.speed;
					fall = false;
				}
			}

		}

//			Mines :

		else {

			if(this.x > p.x-p.size-10 && this.x < p.x + p.size ){

				if(this.y+20 < p.y+p.size && this.y > p.y-p.size){
					this.x = this.startX;
					this.y = this.startY;
					p.explo();
				}
			}

		}

	}

	if(up && !fall){ //jump
		this.up = 50;
	}

	if(!fall) { //normal movement

		if(right)
			this.x++;
		else if(left)
			this.x--;

		this.x -= speed; //add speed of mounted square
	}

	if(space && fall && this.parachute > 0) {

		if(right){
			this.x+= 0.5;
			this.rotate = -5;
			this.parachute--;
			this.renderParachute();
			this.y -= 1.5;
		}
		else if(left) {
			this.x-= 0.5;
			this.rotate = 5;
			this.parachute--;
			this.renderParachute();
			this.y -= 1.5;
		}

	}
	
	if(this.up > 0) { //jump movement

		this.y-=this.up/12;

		if(right)
			this.x += 0.8;
		else if(left)
			this.x -= 0.8;

		this.up--;
	}
	else if(this.up > -50 && fall) { //jump movement

		if(right)
			this.x += 0.8+this.up/80;
		else if(left)
			this.x -= 0.8+this.up/80;

		this.up--;

	}

	if(fall) {
		this.y+=2;
		this.render();
	}
}