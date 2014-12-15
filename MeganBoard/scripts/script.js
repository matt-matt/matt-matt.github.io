var MeganBoard = {
	switchMode: function() {
		$('#qualityCheck').blur();

		var qualityChecked = $('#qualityCheck').prop('checked');
		var userAgent = navigator.userAgent.toLowerCase();

		if (qualityChecked && !(userAgent.indexOf('chrome') <= -1 && userAgent.indexOf('safari') > -1)) {
			$('h1').addClass('specialTitle');
		} else {
			$('h1').removeClass('specialTitle');
		}
	},

	playNote: function(note, key) {
		var currNote;
		var isHQ = $('#qualityCheck').prop('checked');
		var duration = $('#duration').slider('values', 0);

		$('#' + note).addClass('button-clicked');

		if (isHQ) {
			$('#backgroundLeft').show();
			$('#backgroundRight').show();
			currNote = MeganBoard.HQPianoSounds[note].cloneNode();
		} else {
			currNote = MeganBoard.LQPianoSounds[note].cloneNode();
		}
		
		
		if (key === 'click') {
			$('#' + note).mouseup(function() {
				MeganBoard.stopNoteVisual(note, isHQ);
			});
		} else {
			Mousetrap.bind(key, function() {
				MeganBoard.stopNoteVisual(note, isHQ);
			}, 'keyup');
		}

		currNote.addEventListener('timeupdate', function() {
			if (currNote.currentTime >= duration) {
				currNote.pause();
			}
		});
		currNote.play();
	},

	stopNoteVisual: function(noteId, isHQ) {
		$('#backgroundLeft').hide();
		$('#backgroundRight').hide();
		
		$('#' + noteId).removeClass('button-clicked');
	},

	playSound: function(sound) {
		  if (sound === 'emoji') {
			var $emoji = $('<img src="images/emoji.png" width="45px" />');
			var left = Math.random() * 100;
			var top = Math.random() * 100;

			$emoji.css('position', 'absolute');
			$emoji.css('left', left + '%');
			$emoji.css('top', top + '%');
			$emoji.css('z-index', 3);

			$('body').append($emoji);

			MeganBoard.emoji.currentTime = 0;
			MeganBoard.emoji.addEventListener('ended', function() {
				$emoji.remove();
			}, false);

			MeganBoard.emoji.play();
		}
	}
};

(function() {
	var hqaudiotag = ".mp3";
	var lqaudiotag = ".ogg";
	var emoji = "sounds/emoji";
	var userAgent = navigator.userAgent.toLowerCase();

	if (userAgent.indexOf('firefox') > -1) {
	     emoji = "sounds/emoji_alt";
	     hqaudiotag = "" + hqaudiotag;
	}

	if (userAgent.indexOf('chrome') <= -1 && userAgent.indexOf('safari') > -1) {
		alert("Consider switching to a different browser as HTML5 audio has some latency issues with Safari.");
	}

	MeganBoard.emoji = new Audio(emoji + hqaudiotag);

	MeganBoard.HQPianoSounds = [
		new Audio("sounds/piano/piano_c" + hqaudiotag),
		new Audio("sounds/piano/piano_c_sharp" + hqaudiotag),
		new Audio("sounds/piano/piano_d" + hqaudiotag),
		new Audio("sounds/piano/piano_d_sharp" + hqaudiotag),
		new Audio("sounds/piano/piano_e" + hqaudiotag),
		new Audio("sounds/piano/piano_f" + hqaudiotag),
		new Audio("sounds/piano/piano_f_sharp" + hqaudiotag),
		new Audio("sounds/piano/piano_g" + hqaudiotag),
		new Audio("sounds/piano/piano_g_sharp" + hqaudiotag),
		new Audio("sounds/piano/piano_a" + hqaudiotag),
		new Audio("sounds/piano/piano_a_sharp" + hqaudiotag),
		new Audio("sounds/piano/piano_b" + hqaudiotag),
		new Audio("sounds/piano/piano_c_high" + hqaudiotag)
	];
	MeganBoard.LQPianoSounds = [
		new Audio("sounds/piano/piano_c" + lqaudiotag),
		new Audio("sounds/piano/piano_c_sharp" + lqaudiotag),
		new Audio("sounds/piano/piano_d" + lqaudiotag),
		new Audio("sounds/piano/piano_d_sharp" + lqaudiotag),
		new Audio("sounds/piano/piano_e" + lqaudiotag),
		new Audio("sounds/piano/piano_f" + lqaudiotag),
		new Audio("sounds/piano/piano_f_sharp" + lqaudiotag),
		new Audio("sounds/piano/piano_g" + lqaudiotag),
		new Audio("sounds/piano/piano_g_sharp" + lqaudiotag),
		new Audio("sounds/piano/piano_a" + lqaudiotag),
		new Audio("sounds/piano/piano_a_sharp" + lqaudiotag),
		new Audio("sounds/piano/piano_b" + lqaudiotag),
		new Audio("sounds/piano/piano_c_high" + lqaudiotag)
	];

	$(document).ready(function() {
		$('#keyboard').click(function() {
			$(this).fadeOut(500);
			$('#helpBackground').fadeOut(500);
		});

		$('#help').click(function() {
			$('#keyboard').fadeIn(500);
			$('#helpBackground').fadeIn(500);
		});

		$('#qualityCheck').change(function() {
			$('#qualityCheck').trigger('blur');
			MeganBoard.switchMode();
		});

		$('#duration').slider({
			min: 0.00, 
			max: 16.00, 
			step: 1.00, 
			value: 15.00,
			slide: function(event, ui) {
				var value = $('#duration').slider('values', 0);
				if (value.toString().length == 3) {
					$('#durationLabel').html(value + '0');
				} else if (value.toString().length == 1) {
					$('#durationLabel').html(value + '.00');
				} else {
					$('#durationLabel').html(value);
				}
			}
		});

		$('button').mousedown(function() {
			var note = parseInt($(this).attr('id'));
			MeganBoard.playNote(note, 'click');
		});

		$('#keyboard').fadeIn(1000);
		$('#helpBackground').fadeIn(1000);
	});
})();
