var Dispatcher = function() {
	var d = {};
	d.pages = [];
	d.pageDict = {};
	d.currentPage = -1;
	d.status = "normal";

	d.loadPage = function(i) {
		if(this.currentPage >= 0) {
			var page = this.pages[this.currentPage];
			var newPage = this.pages[i];
			var that = this;
			page.exit();
			this.status = "pending";
			page.addEventListener("exitEnd", function() {
				newPage.enter();
				page.removeEventListener("exitEnd");
			});
			newPage.addEventListener("enterEnd", function() {
				that.status = "normal";
				newPage.removeEventListener("enterEnd");
			});
		} else {
			this.pages[i].init();
			this.pages[i].enter();
		}
		if(i < this.pages.length - 1) {
			this.pages[i+1].init(); //提前缓存下一个 
		}
		this.currentPage = i;
	}

	d.nextPage = function() {
		if(this.status != "normal") {
			return;
		}
		
		var nextPage = this.currentPage;
		if(this.currentPage == this.pages.length - 1) {
			nextPage = 0;
		} else {
			nextPage++;
		}

		this.loadPage(nextPage);
	}

	d.init = function() {
		var pages = document.querySelectorAll("#app>.page");
		for(var i = 0; i < pages.length; i++) {
			if(pages[i].id != '') {
				this.pageDict[pages[i].id] = i;
			}
			this.pages.push(Page.instance(pages[i]));
		}
	}

	d.queryPage = function(id) {
		return this.pageDict.hasOwnProperty(id) ? this.pages[this.pageDict[id]] : null;
	}

	d.init();

	return d;
}