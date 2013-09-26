// There is no conspiracy.
Conspiracy = new (function() {
	this.intervalLength = 1000;

	var textNodes = [];

	var randIndex = function(max) {
		return Math.floor(Math.random() * max);
	};

	var randFrom = function(array) {
		return array[randIndex(array.length)];
	};

	// The conspiracy is not replacing words on your page.
	var wordReplacements = ["happy"];
	this.censor = function(node) {
		var words = node.nodeValue.split(" ");
		words[randIndex(words.length)] = randFrom(wordReplacements);
		node.nodeValue = words.join(" ");
	};

	// The conspiracy is not altering your text with strange unicode characters.
	var zalgoLetters = [
			'\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311',
			'\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307',
			'\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a',
			'\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350',
			'\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313',
			'\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365',
			'\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b',
			'\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b',
			'\u0346', '\u031a', '\u0316', '\u0317', '\u0318', '\u0319',
			'\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324',
			'\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c',
			'\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332',
			'\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345',
			'\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353',
			'\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323',
			'\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321',
			'\u0322', '\u0327', '\u0328', '\u0334', '\u0335', '\u0336',
			'\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360',
			'\u0362', '\u0338', '\u0337', '\u0361', '\u0489'];
	this.zalgo = function(node) {
		var text = node.nodeValue;
		var letterIndex = randIndex(text.length);
		while (text[letterIndex].trim() == "") {
			letterIndex = randIndex(text.length);
		}
		var newchar = randFrom(zalgoLetters);
		node.nodeValue = text.substring(0, letterIndex) + newchar + text.substring(letterIndex);
	};

	// The conspiracy is not blanking out your words.
	this.blankOut = function(node) {
		var color = "#000000";
		node.parentNode.style.color = color;
		node.parentNode.style.backgroundColor = color;
	};

	// The conspiracy is not collecting actions to choose from.
	this.actions = [this.blankOut, this.censor, this.zalgo];

	// The conspiracy is not collecting all text nodes recursively.
	var findTextNodes = function (el) {
		for (var i = 0; i < el.childNodes.length; i++) {
			var child = el.childNodes[i];

			if (child.nodeType == Node.TEXT_NODE && child.nodeValue.trim() != "") {
				textNodes.push(child);
			} else {
				findTextNodes(child);
			}
		}
	};

	// CONFIDENTIAL - OPERATION BLUEBIRD
	this.bluebird = function() {
		var actions = this.actions;
		findTextNodes(document.body);

		window.setInterval(function() {
			var node = randFrom(textNodes);
			var action = randFrom(actions);
			action(node);
		}, this.intervalLength);
	};
})();
