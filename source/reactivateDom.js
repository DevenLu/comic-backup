"use strict";

var script = document.createElement("script");
script.type = "text/javascript";
script.id = randomString(20, 40);
script.innerHTML = `(function() {
	var f = function MutationObserver() {},
		sp = Event.prototype.stopPropagation,
		ael = EventTarget.prototype.addEventListener;

	f.prototype.observe = function() {};

	window.MutationObserver = f;
	Object.defineProperty(window, 'MutationObserver', {
		value: f,
		writable: false,
		configurable: false
	});

	Event.prototype.stopPropagation = function stopPropagation() {
		if(!document.documentElement.hasAttribute('scanning'))
			sp.apply(this, arguments);
	};
	EventTarget.prototype.addEventListener = function addEventListener(type) {
		if(type !== "beforeunload")
			return ael.apply(this, arguments);
	};

	document.documentElement.removeChild(document.getElementById("${script.id}"));
}())`;

document.documentElement.insertBefore(script, document.documentElement.firstChild);
