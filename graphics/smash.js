var open = false;

function update(player1, player2) {
	closeWings(
		function() {
			$('#leftName').html(player1);
			$('#leftTextBox').textfill();
		},
		function() {
			$('#rightName').html(player2);
			$('#rightTextBox').textfill();
		}
	);

	setTimeout(function(){
		openWings();
	}, 2500);
}

function openWings() {
	$("#leftWing").animate(
		{
			left: '0'
		},
		750
	);

	$("#rightWing").animate(
		{
			right: '0'
		},
		750
	);

	open = true;
}

function closeWings(onLeftFinishAction = function() {}, onRightFinishAction = function() {}) {
	$("#leftWing").animate(
		{
			left: '268px'
		},
		750,
		() => {
			onLeftFinishAction();
		}
	);

	$("#rightWing").animate(
		{
			right: '268px'
		},
		750,
		() => {
			onRightFinishAction();
		}
	);

	open = false;
}

const nameReplicant = nodecg.Replicant('playerNames', 'smash-overlay');
const scoreReplicant = nodecg.Replicant('playerScores', 'smash-overlay');

nameReplicant.on('change', (newValue, oldValue) => {
	update(newValue[0], newValue[1]);
});
scoreReplicant.on('change', (newValue, oldValue) => {
	$('#leftScore').html(newValue[0]);
	$('#rightScore').html(newValue[1]);
});

nodecg.listenFor('openWings', message => {
	openWings();
});

nodecg.listenFor('closeWings', message => {
	closeWings();
});