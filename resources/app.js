var answers = [
	['涂鸦…图片…照片…都是生活的日常~', '不是那么有艺术气息的人哈哈'],
	['哇，喜欢，手机里塞满各式App', '还好，一般只用常用的App~'],
	['是的，遇到问题第一件事就是理清条理', '做事情随心一些也挺好的呀~'],
	['是的，很喜欢阅读，琢磨文字。', '不喜欢写东西'],
	['哈哈哈是的，微博微信追热点，超开心~', '没有诶，有时候不知道别人在聊些什么梗，超尴尬 0.0']
];

document.body.addEventListener('touchmove', function (event) {
	event.preventDefault();
}, false);

var relayout = function () {
	var appElement = document.querySelector("#app");
	if (document.documentElement.clientWidth > 0) {
		var pageWidth = (appElement.offsetHeight / 1920 * 1080);
		appElement.style.width = pageWidth + "px";
		document.documentElement.style.fontSize = pageWidth / 414 * 100 + "px";
	} else {
		appElement.style.width = "100%";
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 414 * 100 + "px";
	}
}
window.addEventListener('resize', relayout);
relayout();

var dispatcher = Dispatcher();

var parallaxStart = function () {
	if (!this.parallax) {
		this.parallax = new Parallax(this.element);
	} else {
		this.parallax.enable();
	}

	if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
		document.querySelector("#app").style.width = "100%";
	}
};

var parallaxEnd = function () {
	this.parallax.disable();
	relayout();
};

dispatcher.pages[0].addEventListener("enterEnd", parallaxStart);
dispatcher.pages[0].addEventListener("exitEnd", parallaxEnd);

var resultPage = dispatcher.queryPage('result');
resultPage.addEventListener("enterStart", parallaxStart);
resultPage.addEventListener("exitEnd", parallaxEnd);

var analyzePage = dispatcher.queryPage('analyze');
analyzePage.addEventListener("enterEnd", function () {
	setTimeout(function () {
		dispatcher.nextPage();
	}, 2000);

	var titles = ['设计', '产品', '运营', '研发', '行政'];
	var keys = ['design', 'pm', 'operate', 'develope', 'office'];
	var options = [0, 0, 0, 0, 0];

	for (var i = 0, j = 0; i < dispatcher.pages.length; i++) {
		if (dispatcher.pages[i] instanceof QuestionPage) {
			var result = dispatcher.pages[i].result().split(',');
			options[0] += parseInt(result[0])
			options[1] += parseInt(result[1])
			options[2] += parseInt(result[2])
			options[3] += parseInt(result[3])
			options[4] += parseInt(result[4])
			j++;
		}
	}

	log(options);
	text = "";

	for (var i = 0; i < options.length; i++) {
		if (options[i] > 10) {
			$("#resultBox").append('<div class="item biger ' + keys[i] + '"></div>')
			text += titles[i] + '、';
		} else if ((options[i] <= 10) && (options[i] > 6)) {
			$("#resultBox").append('<div class="item big ' + keys[i] + '"></div>')
			text += titles[i] + '、';
		} else if ((options[i] <= 6) && (options[i] > 4)) {
			$("#resultBox").append('<div class="item small' + keys[i] + '"></div>')
		}
	}

	text = text.length > 2 ? text.substr(0, text.length - 1) : text;

	document.querySelector("#description").content = "我在家园工作室最适合的部门竟然是" + text + "，你也快来测测吧~";
});

$("#result .share-mask").click(function () {
	$(this).hide();
}).hide();

function share() {
	$("#result .share-mask").show();
}

dispatcher.loadPage(0);