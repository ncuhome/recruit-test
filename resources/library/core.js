var log = console.log.bind(console);

var Core = {};

Core.extend = function(Child, Parent) {
	var F = function(){};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.super = Parent.prototype;
}

Core.random = function(min, max) {
	return (min + Math.random()*(max-min)).toFixed(1);
}

Core.modifyAlpha = function(color, opacity) {
	if(color.charAt(0) == '#') {
		return 'rgba(' + parseInt(color.substr(1, 2), 16) + ',' + 
						parseInt(color.substr(3, 2), 16) + ',' + 
						parseInt(color.substr(5, 2), 16) + ',' + opacity.toFixed(2) +')';
	} else {
		return color.substr(0, color.lastIndexOf(',')) + ',' + opacity.toFixed(2) + ')';
	}
}