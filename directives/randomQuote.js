app.directive("randomPatienceQuote", function () {
	return {
		restrict: 'EA',
		replace: false,
		link: function (scope, element, attr) {
			var aQuotes = [
				'"Patience is bitter, but it\'s fruit is sweet - Aristotle"',
				'"Patience is not the ability to wait, but how you act while you\'re waiting" - Joyce Meyer',
				'"The key to everything is patience. You get the chicken by hatching the egg, not by smashing it." - Arnold H. Glasow',
				'"Patience is they key to paradise." - Turkish Proverb',
				'"Patience is not an ability to wait, but the ability to keep a good attitude while waiting" - Anonymous',
				'"Patience. Learn, you must." - Yoda',
				'"Genius is eternal patience." - Michelangelo',
				'"Hey girl, patience is a virtue." - Ryan Gosling',
				'"A handful of patience is worth more than a bushel of brains" - Dutch Proverb'

			],
			    quote = aQuotes[Math.floor(Math.random() * aQuotes.length)];
			element.html(quote);
		}
	}

});