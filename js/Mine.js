function Mine(x, y, size, speed){

	this.x = x;
	this.y = y;
	this.size = size/2;
	this.speed = speed;
	this.explode = 0;

	objects.push(this);
}
Mine.prototype.render = function() {

	c.fillStyle = "black";
	c.shadowColor="rgba(0,0,0,0.5)";
	c.shadowBlur=7;
	c.shadowOffsetX = -2;
	c.shadowOffsetY = 2;
	c.beginPath();
	c.arc(this.x, this.y, this.size, 0,2*Math.PI);
	c.fill();
	c.beginPath();
	c.bezierCurve
}
Mine.prototype.tick = function() {

	if(this.x < 0-this.size) {

		this.x = canvas.width+this.size*2;
		this.y = Math.random()*canvas.height+1;

	}
	else
		this.x-= this.speed;

	if(this.explode > 10){

		this.size+=4;
		this.explode--;

	}
	else if(this.explode > 1){
		
		if(this.size > 4){
			this.size-= 4;
			this.explode--;
		}
		else
			this.explode = 1;
	}
	else if(this.explode == 1){

		this.explode = 0;
		/*objects[this.number] = objects[objects.length-1];
		objects.pop();*/
		objects.splice(objects.indexOf(this), 1);

		new Mine(canvas.width+100, Math.random()*canvas.height+1, 100-Math.random()*30, 0.5+Math.random());

	}

	this.render();
}
Mine.prototype.explo = function() {
	
	if(this.explode == 0)
		this.explode = 20;
}