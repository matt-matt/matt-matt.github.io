Mousetrap.bind('`', function() {
	var weedChecked = $('#qualityCheck').prop('checked');
	$('#qualityCheck').prop('checked', !weedChecked);

	MeganBoard.switchMode();
});

Mousetrap.bind('shift', function() {
	MeganBoard.playSound('emoji');
});

Mousetrap.bind('s', function() {
	MeganBoard.playNote(0, 's');
});

Mousetrap.bind('e', function() {
	MeganBoard.playNote(1, 'e');
});

Mousetrap.bind('d', function() {
	MeganBoard.playNote(2, 'd');
});

Mousetrap.bind('r', function() {
	MeganBoard.playNote(3, 'r');
});

Mousetrap.bind('f', function() {
	MeganBoard.playNote(4, 'f');
});

Mousetrap.bind('g', function() {
	MeganBoard.playNote(5, 'g');
});

Mousetrap.bind('y', function() {
	MeganBoard.playNote(6, 'y');
});

Mousetrap.bind('h', function() {
	MeganBoard.playNote(7, 'h');
});

Mousetrap.bind('u', function() {
	MeganBoard.playNote(8, 'u');
});

Mousetrap.bind('j', function() {
	MeganBoard.playNote(9, 'j');
});

Mousetrap.bind('i', function() {
	MeganBoard.playNote(10, 'i');
});

Mousetrap.bind('k', function() {
	MeganBoard.playNote(11, 'k');
});

Mousetrap.bind('l', function() {
	MeganBoard.playNote(12, 'l');
});
