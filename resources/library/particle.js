var Particle = function (stage) {
  this.stage = stage;
  this.initRandom();
};

Particle.prototype.initRandom = function () {
  var colors = [
    "#f46e65",
    "#3dbd7d",
    "#49a9ee",
    "#f7629e",
    "#f78e3d",
    "#948aec",
    "#ffce3d",
    "#3db8c1",
    "#d9d9d9",
  ];

  this.radius = Core.random(this.stage.width * 0.02, this.stage.width * 0.03);
  this.currentRadius = 0;
  this.color = colors[Math.round(Core.random(0, colors.length - 1))];
  this.rotateRadius = Core.random(
    this.stage.width * 0.1,
    this.stage.width * 0.3
  );
  this.speed = Core.random(200, 400) / this.rotateRadius;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.opacity = 0;
  this.color = Core.modifyAlpha(this.color, this.opacity);

  this.theta = parseFloat(Core.random(0, Math.PI * 2));
};

Particle.prototype.update = function () {
  this.theta += (this.speed * Math.PI) / 180;

  if (this.theta > 2 * Math.PI) {
    if (this.opacity > 0) {
      this.opacity -= 0.01 * this.speed;
      if (this.opacity < 0) {
        this.opacity = 0;
      }
      this.color = Core.modifyAlpha(this.color, this.opacity);
    } else {
      this.initRandom();
    }
  } else if (this.opacity < 1 && this.stage.play) {
    this.opacity += 0.01 * this.speed;
    if (this.opacity > 1) {
      this.opacity = 1;
    }
    this.color = Core.modifyAlpha(this.color, this.opacity);
  }

  this.currentRadius = this.radius * this.opacity;

  this.x = this.rotateRadius * Math.cos(this.theta);
  this.y = this.rotateRadius * Math.sin(this.theta);
};

Particle.prototype.draw = function () {
  this.stage.ctx.fillStyle = this.color;
  this.stage.ctx.beginPath();
  this.stage.ctx.arc(this.x, this.y, this.currentRadius, 0, 2 * Math.PI, false);
  this.stage.ctx.fill();
};
