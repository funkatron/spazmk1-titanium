/*
	Code almost entirely stolen from http://jsninja.com/. Great book.
*/
Spaz.Timers = {
	timerID: -1,
	timers: [],
	start: function() {
		// console.info('called start');
		if (Spaz.Timers.timerID > -1) {
			// console.info('nothing queued');
			return;
		}

		// console.info(Spaz.Timers.timers);
		console.info(Spaz.Timers.timerID);
		(function() {
			for (var i = 0; i < Spaz.Timers.timers.length; i++) {
				if (Spaz.Timers.timers[i]() === false) {
					// console.info('timer finished: dropping');
					Spaz.Timers.timers.splice(i, 1);
					i--;
				}
			}
			
			// alert(arguments.callee);
			Spaz.Timers.timerID = setTimeout(arguments.callee, 0);
		})();
	},
	stop: function() {
		clearTimeout(Spaz.Timers.timerID);
		Spaz.Timers.timerID = -1;
	},
	add: function(fn) {

		Spaz.Timers.timers.push(fn);
		Spaz.Timers.start();
	}
};
