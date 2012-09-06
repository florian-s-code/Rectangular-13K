/*
	By Yhoyhoj : twitter.com/yhoyhoj
*/

function Square(x, y, size, color, speed, time) {

	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
	this.speed = speed;
	this.time = time;
	this.player = false;

	objects.push(this);
}
Square.prototype.render = function() {

	c.fillStyle = this.color;
	c.shadowColor="rgba(0,0,0,0.5)";
	c.shadowBlur=7;
	c.shadowOffsetX = -2;
	c.shadowOffsetY = 2;
	c.fillRect(this.x, this.y, this.size, this.size);

	if(this.time) {
		var date =  new Date(new Date() - seconds);
		var text = ("0" + date.getMinutes()).slice(-2) + ":" + ("0"+date.getSeconds()).slice(-2);

		c.restore();
		c.fillStyle = "white";
		c.shadowBlur=0;
		c.shadowOffsetX = -0;
		c.shadowOffsetY = 0;
		c.font = this.size/3-5+"px Arial";
		c.textBaseline = "middle";
		c.fillText(text, Math.round(this.x+(this.size-c.measureText(text).width)/2), Math.round(this.y+this.size/2));
	}

	this.onRender();
}
Square.prototype.onRender = function() {

	if(this.player)
		player.render();

	if(this.grave)
		this.grave.render();

}
Square.prototype.tick = function() {

	if(this.x < -this.size) {

		if(this.time){
			this.size = 125-Math.random()*100;
			this.color = randomColor();
			this.speed = 0.5+Math.random();
			this.x = canvas.width+this.size;
			this.y = this.size+Math.random()*canvas.height-2*this.size+1;
		}
		else {
		this.x = canvas.width+this.size;
		this.y = Math.random()*canvas.height+1;
		}

	}
	else
		this.x-= this.speed;

	this.render();
}