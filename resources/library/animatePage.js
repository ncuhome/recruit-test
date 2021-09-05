var AnimatePage = function (element) {
	Page.apply(this, arguments);
}

Core.extend(AnimatePage, Page);

AnimatePage.prototype.loadAnimate = function () {
	var page = this.element;

	var path = page.getAttribute("data-anim");
	var movinObj = bodymovin.loadAnimation({
		container: page.querySelector('.anim'),
		renderer: 'svg',
		loop: true,
		prerender: true,
		autoplay:true,
		autoloadSegments: false,
		path: path
	});

	var loopStr = page.getAttribute("data-loop").split(',');
	var loop = [parseInt(loopStr[0]), parseInt(loopStr[1])];

	this.anim = movinObj;
	this.loop = loop;
}

AnimatePage.prototype.exit = function () {
	//播放退出动画
	this.trigger("exitStart");
	this.element.classList.add("out");
	this.element.classList.remove("in");

	log(this.loop[1], this.anim.timeCompleted,this.anim);
	this.anim.adjustSegment([this.loop[1], this.anim.timeCompleted]);

	var that = this;
	setTimeout(function () {
		if (that.element.classList.contains("out")) {
			that.element.classList.remove("out");
			that.trigger("exitEnd");
		}
	}, (this.anim.timeCompleted - this.loop[1]) / 30 * 1000); //Issue: 页面有时无法退出
	this.anim.addEventListener("loopComplete", function (evt) {
		if (that.anim.firstFrame >= that.loop[1]) { //处在结尾段
			that.element.classList.remove("out");
			that.trigger("exitEnd");

			that.anim.removeEventListener("loopComplete");
			//that.anim.goToAndStop([that.anim.timeCompleted, that.anim.timeCompleted], true);
			setTimeout(function () { that.anim.destroy(); }, 500); //防止立即退出布局乱掉
		}
	});
};

AnimatePage.prototype.init = function () {
	var that = this;
	this.animateEndEvent = function (evt) {
		if (evt.animationName == "in-end") {
			// css动画播放完后后播放 bm 动画
			that.anim.playSegments([[0, that.loop[0]], that.loop], true);
			that.trigger("enterEnd");
		}
	}

	this.loadAnimate();
	AnimatePage.super.init.call(this);

};

