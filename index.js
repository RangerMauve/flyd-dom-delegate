"use strict";
var Delegate = require("dom-delegate");
var flyd = require("flyd");

module.exports = makeEvents;

function makeEvents(root) {
	var events = Delegate(root);

	return {
		on: makeStream
	};

	function makeStream(event, selector) {
		var stream = flyd.stream();

		events.on(event, selector, stream);

		stream.end.map(function () {
			events.off(event, selector, stream);
		});

		return stream;
	}
}
