window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var AnalyzePage = function(element) {
	Page.apply(this, arguments);
}

Core.extend(AnalyzePage, Page);

AnalyzePage.prototype.init = function() {
	AnalyzePage.super.init.call(this);

	var canvas = this.element.querySelector(".stage");
	var app = document.querySelector("#app");
	var ratio = window.devicePixelRatio;
	this.width = canvas.width = app.clientWidth * ratio;
	this.height = canvas.height = app.clientHeight * ratio;
	this.ctx = canvas.getContext("2d");
	this.ctx.globalCompositeOperation = "lighter";

	this.play = false;
	this.cancel = false;
	this.particles = [];
	for(var i = 0; i < 10; i++) {
		this.particles.push(new Particle(this));
	}
};

AnalyzePage.prototype.render = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
	this.ctx.translate(this.width / 2, this.height / 2);

	for(var i = 0; i < this.particles.length; i++) {
		this.particles[i].update();
		this.particles[i].draw();
	}

	this.ctx.setTransform(1, 0, 0, 1, 0, 0);
}

AnalyzePage.prototype.enter = function() {
	AnalyzePage.super.enter.call(this);
	this.play = true;

	var that = this;
	var _render = function() {
		that.render();

		if(!this.cancel) {
			requestAnimationFrame(_render);
		}
	}
	_render();
}

AnalyzePage.prototype.exit = function() {	
	this.trigger("exitStart");
	this.play = false;

	var that = this;
	setTimeout(function() {
		that.cancel = true;
		that.element.classList.remove("in");
		that.element.classList.add("out");
	}, 1000);
}