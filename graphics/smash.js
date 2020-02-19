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
const score1Replicant = nodecg.Replicant('playerScore1', 'smash-overlay');
const score2Replicant = nodecg.Replicant('playerScore2', 'smash-overlay');

nameReplicant.on('change', (newValue, oldValue) => {
	update(newValue[0], newValue[1]);
});
score1Replicant.on('change', (newValue, oldValue) => {
	$("#leftScore").animate(
		{
			top: '-75px'
		},
		750,
		() => {
			$('#leftScore').html(newValue);

			$("#leftScore").animate(
				{
					top: '0px'
				},
				750
			);
		}
	);

});
score2Replicant.on('change', (newValue, oldValue) => {
	$("#rightScore").animate(
		{
			top: '-75px'
		},
		750,
		() => {
			$('#rightScore').html(newValue);

			$("#rightScore").animate(
				{
					top: '0px'
				},
				750
			);
		}
	);

});

nodecg.listenFor('openWings', message => {
	openWings();
});

nodecg.listenFor('closeWings', message => {
	closeWings();
});