$(document).ready(function(){

//////////////////////////////
// Main Code start here!//////
//////////////////////////////
var playerOneName;
var playerTwoName;
var currentPlayer;
var trCount = 1;

var answerArray = [];
var solutionArray = [];
var hintArray = [];
var counter = 1;

var color = ['blueColor', 'blackColor', 'coralColor', 'purpleColor', 'greenColor'];
var winner;

// Initiate the Game
// Gottaaaa Change the validation process
var getNameGetStart = function (){
	if ($('.p1Name').val().length !== 0 && $('.p2Name').val().length !== 0) {
		playerOneName = $('.p1Name').val();
		playerTwoName = $('.p2Name').val();
		readyGame ();
		currentPlayer = displayPlayer ();
	} else {
		alert('YOUR DON\'T HAVE A NAME?');
		return;
	}
};

var readyGame = function (){
	$('.instruction').after('<div class="showAnsRow col-lg-12"> <button class="showAns" disabled="true">SHOW ANSWER</button> <p class="solutionText" style="display: none"></p> <div class="solutionCircle"></div> </div>');
	$('.instruction').remove();
	$('.answerDisplay').show();
	$('.yourTurn').text('it is your Turn!');
	$('.startGameRow').replaceWith('<h3 class="ftw">For the Win!</h3>');
	$('.answer').after('<button class="submitAns" disabled="true">ROCK ON</button>')
	$('.showAns').attr('disabled', false);
	$('.submitAns').attr('disabled', false);
	$('.answer').attr('disabled', false);
	$('.reference li:first-child').replaceWith('<li class="press"><div class="pressA" >Blue</div> <p><span>enter</span>A<span>/a</span></p> </li>');
	$('.reference li:nth-child(2)').replaceWith('<li class="press"><div class="pressB">Black</div> <p><span>enter</span>B<span>/b</span></p> </li>');
	$('.reference li:nth-child(3)').replaceWith('<li class="press"><div class="pressC">Orange</div> <p><span>enter</span>C<span>/c</span></p> </li>');
	$('.reference li:nth-child(4)').replaceWith('<li class="press"><div class="pressD">Purple</div> <p><span>enter</span>D<span>/d</span></p> </li>');
	$('.reference li:nth-child(5)').replaceWith('<li class="press"><div class="pressE">Green</div> <p><span>enter</span>E<span>/e</span></p> </li>');
};

// Don't use html to keep track of the track
var displayPlayer = function (){
	if ($('tr.answerList').length%2 === 0) {
		$('.whoseTurn').text(playerTwoName + ',');
		currentPlayer = playerTwoName;
	} else {
		$('.whoseTurn').text(playerOneName + ',');
		currentPlayer = playerOneName;
	}
	return currentPlayer;
};

var genTurnCount = function (){
	$('.answerList:last-child td .turnNum').text(trCount);
};

// Get the solution
var randomColor = function () {
	var solu = color[Math.floor(Math.random()*color.length)];
	return solu;
};

var generateSolution = function (){
	for (var i = 0; i < 4; i++) {
		solutionArray[i] = randomColor();
	}
	return solutionArray;
};

// Switch is unnecessary 
var drawSolution = function (){
	var drawSolutionArray = [];
	for (var x = 0; x < solutionArray.length; x++) {
		var eachSolution = solutionArray[x];
		drawSolutionArray.push('<div class="solutionBullet ' + eachSolution + '" style="display: none"></span>');
	}
	for (var y = 0; y < drawSolutionArray.length; y++) {
		$('.solutionCircle').append(drawSolutionArray[y]);
	}
};

// Get Answer Array
var getAnswer = function () {
	return $('.answer').val().toUpperCase();
};

var fillAnsBullet = function () {
	var ans = getAnswer ();
	switch(ans) {
		case 'A':
			ans = "blueColor";
			break;
		case 'B':
			ans = "blackColor";
			break;
		case 'C':
			ans = "coralColor";
			break;
		case 'D':
			ans = "purpleColor";
			break;
		case 'E':
			ans = "greenColor";
			break;
	}
	$($('tr:last-child td')[counter]).replaceWith('<td><div class="ansBullet ' + ans + '"></div></td>');
	return ans;
};

var genAnswerArray = function (){
	var ans = fillAnsBullet ();
	answerArray.push(ans);
};

// Compare Solution with Answer
var compareAnsSolution = function (){
	var temaa = answerArray.slice();
	var temsa = solutionArray.slice();
	var x = 0;
	var z = 0;
	for (x = 0; x < temaa.length; x++) {
		if (temaa[x] == temsa[x]) {
			hintArray.push('cCorrect');
			temaa.splice(x,1);
			temsa.splice(x,1);
			x--;
		}
	}
	for (var y = 0; y < temaa.length; y++) {
		for (z = 0; z < temsa.length; z++) {
			if (temaa[y] == temsa[z]) {
				hintArray.push('pCorrect');
				temsa.splice(z,1);
				temaa[y] = null;
			}
		}
	}
	var placeLeft = 4 - hintArray.length;
	while (placeLeft > 0) {
		hintArray.push('incorrect');
		placeLeft--;
	}
	return hintArray;
};

// Randomize hint list
var randHintList = function (){
	var hintList = compareAnsSolution();
    for(var j, x, i = hintList.length;
     i; 
     j = Math.floor(Math.random() * i), x = hintList[--i], hintList[i] = hintList[j], hintList[j] = x);
    return hintList;
};

var fillHintBullet = function () {
	var hint = randHintList ();
	for (var z = 0; z < 4; z++) {
		var eachHint = hint[z];
		switch(eachHint) {
			case 'cCorrect':
				$($('tr:last-child td:last-child div')[z]).replaceWith('<div class="hintBullet colorTomato" title="Got the color and place right!"></div>');
				break;
			case 'pCorrect':
				$($('tr:last-child td:last-child div')[z]).replaceWith('<div class="hintBullet colorSalmon" title="You got the right color but place it in the wrong location!"></div>');
				break;
			case 'incorrect':
				$($('tr:last-child td:last-child div')[z]).replaceWith('<div class="hintBullet crimson" title="Opsss..Wrong color and wrong place!"></div>');
				break;
			}
	}
	hintArray = hint;
	return hint;
};

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
};


////////////////////// 
// Call functions ////
//////////////////////
$(document).on('click', '.getStarted', function (){
	getNameGetStart ();
	solutionArray = generateSolution ();
	drawSolution ();
});

$(document).on('click', '.submitAns', function (){
	displayPlayer ();
	genTurnCount ();
	if (getAnswer () === 'A' || getAnswer () === 'B' || getAnswer () === 'C' || getAnswer () === 'D' || getAnswer () === 'E') {
		if (counter < 5) {
			genAnswerArray ();
		}
		if (counter == 4) {
			fillHintBullet ();
			getWinner ();
			if (winner !== undefined && winner !== null) {
				$('body').html('<div class="championWrapper"><h1 class="champion">'+ winner + '</h1><p class="championText">You are the Boss!</p></div>');
				$('body').append('<audio src="assets/sound/rock.mp3" preload="auto" autoplay></audio>');
			} else {
				$('tr:last-child').after("<tr class=\"answerList\"><td><p class=\"turnNum\">1</p></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"hintBullet greyColor\"></div><div class=\"hintBullet greyColor\"></div><div class=\"hintBullet greyColor\"></div><div class=\"hintBullet greyColor\"></div></td></tr>");
				trCount ++;
				displayPlayer();
				genTurnCount ();
				counter = 1;
				answerArray = [];
				hintArray = [];
			}
		} else if (counter < 4) {
			counter ++;
		}
		$('.answer').val('');
	}
	switch (counter) {
		case 1:
			$('.input-group-addon .glyphicon').replaceWith('<span class="glyphicon glyphicon-tint"></span>');
			break;
		case 2:
			$('.input-group-addon .glyphicon').replaceWith('<span class="glyphicon glyphicon-star"></span>');
			break;
		case 3:
			$('.input-group-addon .glyphicon').replaceWith('<span class="glyphicon glyphicon-leaf"></span>');
			break;
		case 4:
			$('.input-group-addon .glyphicon').replaceWith('<span class="glyphicon glyphicon-fire"></span>');
			break;
	}	
});

// Click Div to get Answer
var divClick = function (){
	displayPlayer ();
	genTurnCount ();
	if (counter < 5) {
		genAnswerArray ();
	}
	if (counter == 4) {
		fillHintBullet ();
		getWinner ();
		if (winner !== undefined && winner !== null) {
			$('body').html('<div class="championWrapper"><h1 class="champion">'+ winner + '</h1><p class="championText"><img src="assets/image/likeABoss.gif"></p></div>');
			$('body').append('<audio src="assets/sound/rock.mp3" preload="auto" autoplay></audio>');
		} else {
			$('tr:last-child').after("<tr class=\"answerList\"><td><p class=\"turnNum\">1</p></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"ansBullet whiteColor\"></div></td><td><div class=\"hintBullet greyColor\"></div><div class=\"hintBullet greyColor\"></div><div class=\"hintBullet greyColor\"></div><div class=\"hintBullet greyColor\"></div></td></tr>");
			trCount ++;
			displayPlayer();
			genTurnCount ();
			counter = 1;
			answerArray = [];
			hintArray = [];
		}
	} else if (counter < 4) {
		counter ++;
	}
	$('.answer').val('');
	switch (counter) {
		case 1:
			$('.input-group-addon .glyphicon').replaceWith('<span class="glyphicon glyphicon-tint"></span>');
			break;
		case 2:
			$('.input-group-addon .glyphicon').replaceWith('<span class="glyphicon glyphicon-star"></span>');
			break;
		case 3:
			$('.input-group-addon .glyphicon').replaceWith('<span class="glyphicon glyphicon-leaf"></span>');
			break;
		case 4:
			$('.input-group-addon .glyphicon').replaceWith('<span class="glyphicon glyphicon-fire"></span>');
			break;
	}	
}

$(document).on('click', '.reference .press:first-child', function (){
	$('.answer').val('A');
	divClick ();
});

$(document).on('click', '.reference .press:nth-child(2)', function (){
	$('.answer').val('B');
	divClick ();
});

$(document).on('click', '.reference .press:nth-child(3)', function (){
	$('.answer').val('C');
	divClick ();
});

$(document).on('click', '.reference .press:nth-child(4)', function (){
	$('.answer').val('D');
	divClick ();
});

$(document).on('click', '.reference .press:nth-child(5)', function (){
	$('.answer').val('E');
	divClick ();
});


// Show Answer
$(document).on('click', '.showAns', function (){  
	$('div.solutionBullet').toggle("fast");
});

$(document).on('mouseover', '.hintBullet', function (){
 $('div[title]').qtip();
})



});