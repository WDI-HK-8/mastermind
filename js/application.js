$(document).ready(function(){

// Sound Effect Plugin
/**
 * @author Alexander Manzyuk <admsev@gmail.com>
 * Copyright (c) 2012 Alexander Manzyuk - released under MIT License
 * https://github.com/admsev/jquery-play-sound
 * Usage: $.playSound('http://example.org/sound.mp3');
**/

(function($){

  $.extend({
    playSound: function(){
      return $("<embed src='"+arguments[0]+".mp3' hidden='true' autostart='true' loop='false' class='playSound'>" + "<audio autoplay='autoplay' style='display:none;' controls='controls'><source src='"+arguments[0]+".mp3' /><source src='"+arguments[0]+".ogg' /></audio>").appendTo('body');
    }
  });

})(jQuery);

//////////////////////////////
// Main Code start here!//////
//////////////////////////////
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
	if ($('.p1Name').val().length !== 0 && $('.p2Name').val().length !== 0) {
		playerOneName = $('.p1Name').val();
		playerTwoName = $('.p2Name').val();
		currentPlayer = displayPlayer ();
		readyGame ();
	} else {
		alert('YOUR DON\'T HAVE A NAME?');
		return;
	}
};

var readyGame = function (){
	$('.instruction').after('<div class="showAnsRow col-lg-12"> <button class="showAns" disabled="true">SHOW ANSWER</button> <p class="solutionText" style="display: none"></p> <div class="solutionCircle"></div> </div>');
	$('.instruction').remove();
	$('.startGameRow').after('<table class="col-lg-12 table table-hover answerDisplay"> <tr class="inputName"> <th>TURN</th> <th><span class="glyphicon glyphicon glyphicon-tint"></span></th> <th><span class="glyphicon glyphicon-star"></span></th> <th><span class="glyphicon glyphicon-leaf"></span></th> <th><span class="glyphicon glyphicon-fire"></span></th> <th>HINT</th> </tr> <tr class="answerList"> <td> <p class="turnNum">1</p> </td> <td> <div class="ansBullet whiteColor"></div> </td> <td> <div class="ansBullet whiteColor"></div> </td> <td> <div class="ansBullet whiteColor"></div> </td> <td> <div class="ansBullet whiteColor"></div> </td> <td> <div class="hintBullet greyColor"></div> <div class="hintBullet greyColor"></div> <div class="hintBullet greyColor"></div> <div class="hintBullet greyColor"></div> </td> </tr> </table>');
	$('.yourTurn').text('it is your Turn!');
	$('.startGameRow').replaceWith('<h3 class="ftw">For the Win!</h3>');
	$('.showAns').attr('disabled', false);
	$('.submitAns').attr('disabled', false);
	$('.answer').attr('disabled', false);
	$('.answer').after('<button class="submitAns" disabled="true">ROCK ON</button>')
	$('.reference li:first-child').replaceWith('<li class="press"><div class="pressA" >pacifica</div> <p><span>enter</span>A<span>/a</span></p> </li>');
	$('.reference li:nth-child(2)').replaceWith('<li class="press"><div class="pressB">caribic</div> <p><span>enter</span>B<span>/b</span></p> </li>');
	$('.reference li:nth-child(3)').replaceWith('<li class="press"><div class="pressC">Chic</div> <p><span>enter</span>C<span>/c</span></p> </li>');
	$('.reference li:nth-child(4)').replaceWith('<li class="press"><div class="pressD">Cheery</div> <p><span>enter</span>D<span>/d</span></p> </li>');
	$('.reference li:nth-child(5)').replaceWith('<li class="press"><div class="pressE">Babyblue</div> <p><span>enter</span>E<span>/e</span></p> </li>');
};

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
	turnCount = $('.answerList').length;
	var currentTurn = $('.answerList:last-child td .turnNum');
	$(currentTurn).text(turnCount);
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
};

// Get Answer Array
var getAnswer = function () {
	return $('.answer').val().toUpperCase();
};

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
				$($('tr:last-child td:last-child div')[z]).replaceWith('<div class="hintBullet colorTomato"></div>');
				break;
			case 'pCorrect':
				$($('tr:last-child td:last-child div')[z]).replaceWith('<div class="hintBullet colorSalmon"></div>');
				break;
			case 'incorrect':
				$($('tr:last-child td:last-child div')[z]).replaceWith('<div class="hintBullet crimson"></div>');
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
	if (getAnswer () == 'A' || getAnswer () == 'B' || getAnswer () == 'C' || getAnswer () == 'D' || getAnswer () == 'E') {
		if (counter < 5) {
			genAnswerArray ();
		}
		if (counter == 4) {
			fillHintBullet ();
			getWinner ();
			if (winner !== undefined && winner !== null) {
				$('body').html('<div class="championWrapper"><h1 class="champion">'+ winner + '</h1><p class="championText">You are the Boss!</p></div>');
				$.playSound('assets/sound/rock');
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
			$('body').html('<div class="championWrapper"><h1 class="champion">'+ winner + '</h1><p class="championText">You are the Boss!</p></div>');
			$.playSound('assets/sound/rock');
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





});