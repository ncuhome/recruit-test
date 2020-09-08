var Page = function(element) {
	this.element = element;
	this.initialized = false;
	this._event = {
		enterStart: [],
		enterEnd: [],
		exitStart: [],
		exitEnd: []
	};

	var that = this;
	this.animateEndEvent = function(evt) {
		if(evt.animationName == "in-end") {
			that.trigger("enterEnd");
		} else if(evt.animationName == "out-end") {
			that.element.classList.remove("out");
			that.trigger("exitEnd");
		}
	};
}

Page.instance = function(element) {
	if(element.classList.contains("question")) {
		return new QuestionPage(element);
	} else if(element.classList.contains("bm")) {
		return new AnimatePage(element);
	} else if(element.classList.contains("analyze")) {
		return new AnalyzePage(element);
	} else {
		return new Page(element);
	}
}

Page.prototype.addEventListener = function(name, callback) {
	this._event[name].push(callback);
};

Page.prototype.removeEventListener = function(name) {
	this._event[name] = [];
}

Page.prototype.trigger = function(name) {
	log(name);
	for(var i = 0; i < this._event[name].length; i++) {
		this._event[name][i].apply(this, [].slice.call(arguments, 1));
	}
}

Page.prototype.init = function() {
	this.element.addEventListener("webkitAnimationEnd", this.animateEndEvent);
	this.element.addEventListener("animationend", this.animateEndEvent);

	this.initialized = true;
};

Page.prototype.enter = function() {
	this.element.classList.add("in");
	this.trigger("enterStart");
};

Page.prototype.exit = function() {
	this.element.classList.remove("in");
	this.element.classList.add("out");
	this.trigger("exitStart");
};