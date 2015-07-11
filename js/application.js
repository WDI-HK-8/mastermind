$(document).ready(function(){
var playerOneName;
var playerTwoName;
var currentPlayer;
var turnCount = 0;

var answerArray = [];
var solutionArray = [];
var hintArray = [];
var counter = 1;

var color = ['pacifica', 'caribic', 'chic', 'cheery', 'baby'];
var winner;

// Initiate the Game
var getNameGetStart = function (){
	if ($('.p1Name').val().length != 0 && $('.p2Name').val().length != 0) {
		playerOneName = $('.p1Name').val();
		playerTwoName = $('.p2Name').val();
		currentPlayer = displayPlayer ();
		readyGame ();
	} else {
		return;
	}
}

var readyGame = function (){
	$('.startGameRow').replaceWith('<h3 class="ftw">For the Win!</h3>');
	$('.showAns').attr('disabled', false);
	$('.submitAns').attr('disabled', false);
	$('.answer').attr('disabled', false);
}

var displayPlayer = function (){
	if ($('tr.answerList').length%2 === 0) {
		$('.whoseTurn').text(playerTwoName + ',');
		currentPlayer = playerTwoName;
	} else {
		$('.whoseTurn').text(playerOneName + ',');
		currentPlayer = playerOneName;
	}
	return currentPlayer;
}

var genTurnCount = function (){
	turnCount = $('.answerList').length;
	var currentTurn = $('.answerList:last-child td .turnNum');
	$(currentTurn).text(turnCount);
}

// Get the solution
var randomColor = function () {
	var solu = color[Math.floor(Math.random()*color.length)];
	return solu;
}

var generateSolution = function (){
	for (var i = 0; i < 4; i++) {
		solutionArray[i] = randomColor();
	}
	return solutionArray;
}

var drawSolution = function (){
	var drawSolutionArray = [];
	for (var x = 0; x < solutionArray.length; x++) {
		var eachSolution = solutionArray[x];
		switch(eachSolution) {
			case 'pacifica':
				drawSolutionArray.push('<div class="solutionBullet pacificaColor" style="display: none"></span>');
				break;
			case 'caribic':
				drawSolutionArray.push('<div class="solutionBullet caribicColor" style="display: none"></span>');
				break;
			case 'chic':
				drawSolutionArray.push('<div class="solutionBullet appleChicColor" style="display: none"></span>');
				break;
			case 'cheery':
				drawSolutionArray.push('<div class="solutionBullet cheeryPinkColor" style="display: none"></span>');
				break;
			case 'baby':
				drawSolutionArray.push('<div class="solutionBullet babyBlue" style="display: none"></span>');
				break;
		}
	}
	for (var y = 0; y < drawSolutionArray.length; y++) {
		$('.solutionCircle').append(drawSolutionArray[y]);
	}
}

// Get Answer Array
var getAnswer = function () {
	return $('.answer').val().toUpperCase();
}

var fillAnsBullet = function () {
	var ans = getAnswer ();
	switch(ans) {
		case 'A':
			ans = "pacifica";
			$($('tr:last-child td')[counter]).replaceWith('<td><div class="ansBullet pacificaColor"></div></td>');
			break;
		case 'B':
			ans = "caribic";
			$($('tr:last-child td')[counter]).replaceWith('<td><div class="ansBullet caribicColor"></div></td>');
			break;
		case 'C':
			ans = "chic";
			$($('tr:last-child td')[counter]).replaceWith('<td><div class="ansBullet appleChicColor"></div></td>');
			break;
		case 'D':
			ans = "cheery";
			$($('tr:last-child td')[counter]).replaceWith('<td><div class="ansBullet cheeryPinkColor"></div></td>');
			break;
		case 'E':
			ans = "baby";
			$($('tr:last-child td')[counter]).replaceWith('<td><div class="ansBullet babyBlue"></div></td>');
			break;
	}
	return ans
}

var genAnswerArray = function (){
	var ans = fillAnsBullet ();
	answerArray.push(ans);
}

// Compare Solution with Answer
// Need to be fixed!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var compareAnsSolution = function (){
	for (var i = 0; i < answerArray.length; i++) {
		var checkpcorrect = 0;
		for (var j = 0; j < solutionArray.length; j++) {
				if (answerArray[i] == solutionArray[j]){
					checkpcorrect++;
			}
		}
		if (answerArray[i] == solutionArray[i]) {
			hintArray.push('cCorrect');
		} else if (checkpcorrect > 0) {
			hintArray.push('pCorrect');
		} else {
			hintArray.push('incorrect');
		}
	}
	return hintArray;
}

// Randomize hint list
var randHintList = function (){
	var hintList = compareAnsSolution();
    for(var j, x, i = hintList.length;
     i; 
     j = Math.floor(Math.random() * i), x = hintList[--i], hintList[i] = hintList[j], hintList[j] = x);
    return hintList;
}

var fillHintBullet = function () {
	var hint = randHintList ();
	for (var z = 0; z < 4; z++) {
		var eachHint = hint[z];
		switch(eachHint) {
			case 'cCorrect':
				$($('tr:last-child td:last-child div')[z]).replaceWith('<div class="hintBullet colorTomato"></div>');
				break;
			case 'pCorrect':
				$($('tr:last-child td:last-child div')[z]).replaceWith('<div class="hintBullet colorSalmon"></div>');
				break;
			case 'incorrect':
				$($('tr:last-child td:last-child div')[z]).replaceWith('<div class="hintBullet whiteColor"></div>');
				break;
			}
	}
	hintArray = hint;
	return hint;
}

// Get Winner
var getWinner = function (){
	var x = 0;
	for (var i = 0; i < hintArray.length; i++) {
		if (hintArray[i] === "cCorrect"){
			x++;
		}
	}
	if (x == 4) {
		winner = currentPlayer;
	}
}

$(document).on('click', '.getStarted', function (){
	getNameGetStart ();
	solutionArray = generateSolution ();
	drawSolution ();
})

$(document).on('click', '.submitAns', function (){
	displayPlayer ();
	genTurnCount ();
	if (getAnswer () == 'A' 
	|| getAnswer () == 'B'
	|| getAnswer () == 'C'
	|| getAnswer () == 'D'
	|| getAnswer () == 'E') {
		if (counter < 5) {
			genAnswerArray ();
		}
		if (counter == 4) {
			fillHintBullet ();
			getWinner ();
			if (winner != undefined && winner != null) {
				console.log('yaaaaaa!');
			} else {
				$('tr:last-child').after("<tr class=\"answerList\"><td><p class=\"turnNum\">1</p></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"hintBullet greyColor\"></div><div class=\"hintBullet greyColor\"></div><div class=\"hintBullet greyColor\"></div><div class=\"hintBullet greyColor\"></div></td></tr>");
				displayPlayer();
				genTurnCount ();
				counter = 1;
				answerArray = [];
				hintArray = [];
			}
		} else if (counter < 4) {
			counter ++;
		}
	}	
})

$(document).on('click', '.showAns', function (){  
	$('div.solutionBullet').toggle("fast");
})











})