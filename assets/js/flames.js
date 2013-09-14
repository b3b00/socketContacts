
function drawFlame(color, px, py, radius) {
    this._.fillStyle = color;
	this._.beginPath();
	this._.arc(
		px, py,
		radius, 0,
		Math.PI*2, false
	);
	this._.closePath();
	this._.fill();
}

sonic = new Sonic({
			
	width: 100,
	height: 100,

	stepsPerFrame: 4,
	trailLength: 0.8,
	pointDistance: 0.01,
	fps: 20,

	backgroundColor: '#FFFFFF',

	path: [
		['arc', 60, 60, 30, 0, 360]
	],

	step: function(point, index, frame) {

		var sizeMultiplier = 10;
        var radius = sizeMultiplier * (index > 0.5 ? 1-index : index);
        
        drawFlame.call(this, '#FF6C08', point.x*index, point.y, radius);
        drawFlame.call(this, '#FFD341', point.x, point.y*index, radius);
        drawFlame.call(this, '#FF3000', point.x, point.y, radius);

	}

});
sonic.play();

document.body.appendChild(sonic.canvas);