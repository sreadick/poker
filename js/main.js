// problem hands:
// dealer is small blind(maybe), puts user user all in on the river, user calls and throws in chips... nothing happens
// only sometimes--- dealer is big blind, user checks then dealer checks, as dealer message is dipalyed... check and bet breifly appear then disapear, then appear again after cards are dealt

	var config = {
	    apiKey: "AIzaSyDBns8wbAR9Mun1v559uM-XbieXOg90Xlk",
	    authDomain: "poker-7c482.firebaseapp.com",
	    databaseURL: "https://poker-7c482.firebaseio.com",
	    storageBucket: "",
	    messagingSenderId: "487524522836"
	};
	firebase.initializeApp(config);

	var pokerAppReference = firebase.database();
	  
	
	const highScoreReference = firebase.database().ref("high_score");

	function updateLeaderBoard(newPlayer, newScore) {

		$("#high-scores-screen").show("slide", { direction: "up" }, 1000);

		$(".players *, #com-cards *, #deck, #message").css("visibility","hidden");
		$("#user").hide();

		$("#no").hide();
		$("#yes").text("Play Again?").show();
		
		$("#play-again-container").css({"top":"190px","visibility":"visible"});
		$(".place").css("color","pink");
		$(".player-name").css("color","grey");
		$(".wins").css("color","rgb(180, 180, 0)");


		pokerAppReference.ref("high_score").on("value", function(results) {
			var totalScores = results.val();

			var scoreEntryArray = [];
			var sortedScoreEntries = [];
			
			for (var objItem in totalScores){

				scoreEntryArray.push({
					place: totalScores[objItem].place,
					playerName: totalScores[objItem].player_name,
					wins: totalScores[objItem].wins
				});
			}

			sortedScoreEntries.push(scoreEntryArray[2]);
			sortedScoreEntries.push(scoreEntryArray[5]);
			sortedScoreEntries.push(scoreEntryArray[9]);
			sortedScoreEntries.push(scoreEntryArray[3]);
			sortedScoreEntries.push(scoreEntryArray[1]);
			sortedScoreEntries.push(scoreEntryArray[7]);
			sortedScoreEntries.push(scoreEntryArray[6]);
			sortedScoreEntries.push(scoreEntryArray[0]);
			sortedScoreEntries.push(scoreEntryArray[4]);
			sortedScoreEntries.push(scoreEntryArray[8]);
			
			for (var i = 0; i < sortedScoreEntries.length; ++i) {

				if (newScore > sortedScoreEntries[i].wins) {
					
					sortedScoreEntries.splice(i, 0, {
						place: i + 1,
						playerName: newPlayer,
						wins: newScore,
					});

					newScore = 0;

					sortedScoreEntries.splice(sortedScoreEntries.length, 1);

					for (var j = sortedScoreEntries[i].place; j < sortedScoreEntries.length; ++j) {
						sortedScoreEntries[j].place++
					}	

					$("#high-scores div").eq([i]).css("background", "white");
					$("#high-scores div").eq([i]).find("span").css("color", "black");
					
				}

			  	$("#high-scores div").eq([i]).find("span:first-child").text(sortedScoreEntries[i].place);	
				$("#high-scores div").eq([i]).find("span:nth-child(2)").text(sortedScoreEntries[i].playerName);
			  	$("#high-scores div").eq([i]).find("span:last-child").text(sortedScoreEntries[i].wins);	

			}

			firebase.database().ref('high_score/first_place').set({
				place: sortedScoreEntries[0].place,
				player_name: sortedScoreEntries[0].playerName,
				wins: sortedScoreEntries[0].wins
			});
			firebase.database().ref('high_score/second_place').set({
				place: sortedScoreEntries[1].place,
				player_name: sortedScoreEntries[1].playerName,
				wins: sortedScoreEntries[1].wins
			});
			firebase.database().ref('high_score/third_place').set({
				place: sortedScoreEntries[2].place,
				player_name: sortedScoreEntries[2].playerName,
				wins: sortedScoreEntries[2].wins
			});
			firebase.database().ref('high_score/fourth_place').set({
				place: sortedScoreEntries[3].place,
				player_name: sortedScoreEntries[3].playerName,
				wins: sortedScoreEntries[3].wins
			});
			firebase.database().ref('high_score/fifth_place').set({
				place: sortedScoreEntries[4].place,
				player_name: sortedScoreEntries[4].playerName,
				wins: sortedScoreEntries[4].wins
			});
			firebase.database().ref('high_score/sixth_place').set({
				place: sortedScoreEntries[5].place,
				player_name: sortedScoreEntries[5].playerName,
				wins: sortedScoreEntries[5].wins
			});
			firebase.database().ref('high_score/seventh_place').set({
				place: sortedScoreEntries[6].place,
				player_name: sortedScoreEntries[6].playerName,
				wins: sortedScoreEntries[6].wins
			});
			firebase.database().ref('high_score/eighth_place').set({
				place: sortedScoreEntries[7].place,
				player_name: sortedScoreEntries[7].playerName,
				wins: sortedScoreEntries[7].wins
			});
			firebase.database().ref('high_score/ninth_place').set({
				place: sortedScoreEntries[8].place,
				player_name: sortedScoreEntries[8].playerName,
				wins: sortedScoreEntries[8].wins
			});
			firebase.database().ref('high_score/tenth_place').set({
				place: sortedScoreEntries[9].place,
				player_name: sortedScoreEntries[9].playerName,
				wins: sortedScoreEntries[9].wins
			});
			
		});

	}
	







$(document).on("ready", function() {

// TODO:
// improve dealer AI
// fix all in
// fix chip system
// make responsive
// work out closed straight draw
// fix 6 card flush issue
// add betting arrow buttons
// use firebase to store high scores

	$("#name-input").focus();

	$(".cards, .players, #bet-form, #message, #pot").css("visibility", "hidden");

	$("#customized-colors").on("click", "div", function() {
		if ($(this).hasClass("backgrounds")) {
			$("body").css("background", $(this).css("background"));
		} else {
			$("#table").css("background", $(this).css("background"));
		}

		// $("#customized-colors").hide("slide", { direction: "left" }, 1000);
	});
	$("input").keydown(function(e) {
    	if(e.keyCode === 13 && $("#name-input").val().length > 0) {
        	user.bankroll -= 250;
    		dealer.bankroll -= 250;
        	getName();
    	}
	});	
	$("input").keydown(function(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			$("#message, #customized-colors, .cards img, .player-info").css("visibility","visible")	;	
			user.bankroll -= 250;
    		dealer.bankroll -= 250;
			getName();
		}
	})
	$("#name-submit").on("click", function() {
		if ($("#name-input").val().length > 0) {
			$("#message, #customized-colors, .cards img, .player-info").css("visibility","visible")	;	
			user.bankroll -= 250;
    		dealer.bankroll -= 250;
			getName();	 
		}
	});

	$("#check").on("click", function() {
		user.check();
		$("#bet-form *").css("visibility", "hidden");
		$("#bet, #check").hide()
	});
	$("#bet").on("click", function() {
		$("#bet-form *").css("visibility", "visible");
		$("#bet-input").focus();
		$("#user-bet-chips").hide();
		
	});
	$("#call").on("click", function() {
		$("#bet-form *").css("visibility", "hidden");
		$("#call, #raise, #fold").hide();
		$("#bet-options button").css("visibility","hidden");
		$("#user-bet-chips").show();
		user.call()	
	});
	$("#raise").on("click", function() {
		$("#bet-form *").css("visibility", "visible");
		$("#bet-input").focus();
		$("#user-bet-chips").hide();
	});
	$("#fold").on("click", function() {
		user.fold();
		$("#call, #raise, #fold").hide();
	});
	$("#bet-submit").on("click", function() {
		if ($("#bet-input").val() > 0 && $("#bet-input").val() <= user.bankroll) {
    		user.bet(parseInt($("#bet-input").val()));
    		$("#bet-form *").css("visibility", "hidden");
    		$("#user-bet-chips").show();
    		$("#bet-input").val("");	   		
		}
	});

	$("#no").on("click", function() {
		updateLeaderBoard(user.playerName, user.consecWins);
	});
	$("#next-hand, #yes").on("click", function() {

		game.pot = 0;
		$(".players *, #com-cards *, #deck, #message").css("visibility","visible");
		$("#user").show();

		// $("#play-again-container").css("top", "65px");
		$("#high-scores-screen").hide();
		$("#user-bet-chips").css("visibility","visible").show();
		$("#user-card1, #user-card2, #dealer-card1, #dealer-card2").removeClass("dealt");

		$("#play-again-container").css("visibility", "hidden");
		$("#play-again-container > button").hide();

		$("#pot-chips img").remove();
		$("#user p, #dealer p").removeClass("add-funds");
		$("#message").css("visibility", "hidden");
		$("#com-cards #card1").remove();
		$("#com-cards #card2").remove();
		$("#com-cards #card3").remove();
		$("#com-cards #card4").remove();
		$("#com-cards #card5").remove();
		$("#com-cards").append("<img id=card1>", "<img id=card2>", "<img id=card3>", "<img id=card4>", "<img id=card5>");
		$("#com-cards *").css("margin", "0 5px");
		
		
		$("#user-card1").css({"right": "153px", "top": "-239px"});
		$("#user-card2").css({"right": "233px", "top": "-239px"});	
		$("#dealer-card1").css({"right": "153px", "top": "214px"});
		$("#dealer-card2").css({"right": "233px", "top": "214px"});

		if (game.userTurn === "first") {
			game.userTurn = "second";
		} else {
			game.userTurn = "first";			
		}				
		
		$("#bet-options *").css("visibility", "hidden");
		$("#bet-options *").show();
		$("#bet-form *").css("visibility", "hidden");
		
		var allInBlind = false;	
		if (user.bankroll > 250 && dealer.bankroll > 250) {
			user.bankroll -= 250;
    		dealer.bankroll -= 250;
    	} else {
    		allInBlind = true;
    	}

    	newGame(game.userTurn, allInBlind);

    	$("#pot p").css("visibility", "hidden");
    	if (game.userTurn === "first") {
    		setTimeout(function(){
    			$("#user-card1").addClass("dealt");
    			$("#user-card1").css({"right": "0", "bottom": "0"});
    			var snd = new Audio("audio/cardSlide2.wav");
    			snd.play();
    		}, 100)
    	} else {
    		setTimeout(function(){
    			$("#dealer-card1").addClass("dealt");
    			$("#dealer-card1").css({"right": "0", "top": "0"});
    			var snd = new Audio("audio/cardSlide2.wav");
    			snd.play();
    		}, 100)
		}
	});

	function gameInit(arbitraryNumber) {
		if (arbitraryNumber % 2 === 0) {
			return;
		}
		user.currentBet = 0;
		dealer.currentBet = 0;
		$("#bet-options button").css("visibility", "visible");
		$("#com-cards *").css("visibility", "hidden");
		$("#message").css("visibility", "hidden");
		$("#pot p").css("visibility", "visible");
		genChips("#pot-chips", game.pot);

		if (game.userTurn === "first" && user.bankroll > 0 && dealer.bankroll > 0) {
			dealer.bet("small blind");
		} else if (game.userTurn === "second" && user.bankroll > 0 && dealer.bankroll > 0) {			
			user.bet("small blind");
			if (dealer.currentBet > 0) {
				$("#check, #bet").hide();
				$("#call, #raise, #fold").show();
			} else if (game.pot === 750) {
				$("play-again-container").css("visibility", "visible");
				$("#next-hand").show();
				$("#user-bet-chips").hide();
				$("#yes, #no").hide();
				return;
			} else if (user.bankroll === 0 || dealer.bankroll === 0) {
				$("#bet-options *").hide();
			} else {
				$("#call, #raise, #fold").hide();
				$("#check, #bet").show();
			}
		} else if (user.bankroll === 0 || dealer.bankroll === 0) {
			$("#bet-options *").hide();
			endTurn();
		} 
		if (game.userTurn === "first") {
    		$("#pot p").html("pot: $" + game.pot).val();
			genChips("#pot-chips", game.pot);
 		}
 		$("#user p").html("$" + user.bankroll);
 		genChips("#user-chips", user.bankroll);
 		$("#dealer p").html("$" + dealer.bankroll);
 		genChips("#dealer-chips", dealer.bankroll);
 				
	}

	$("#message").on("animationend", function(e) {
		if ((game.userTurn === "first") || (game.userTurn === "second" && user.currentBet > 0)) {	
			endTurn()
		} else {
			$("#check, #bet").show();
			$("#call, #raise, #fold").hide();
		}
		$("#message").removeClass("fade")
	});

	Array.prototype.contains = function(obj) {
    	var i = this.length;
    	while (i--) {
        	if (this[i] === obj) {
            	return true;
        	}
    	}
    	return false;
	}

	

	var deck = [];
	var user;
	var dealer;
	var game;

	user = new Player(" ");
	dealer = new Player("dealer");

	var userTurn = "first"
	var allInBlind = false;
	var round = 0;
	newGame(userTurn, allInBlind, round);

	function newGame(userTurn, allInBlind, round) {
		deck.length = 0;
		createDeck()	
		shuffle();
		user.hand = deal(2);
		dealer.hand = deal(2);
		game = new Game(userTurn, allInBlind, round);
	}

	function Game(userTurn, allInBlind, round) {
		this.userTurn = userTurn;
		this.cards = [];
		this.turn = "preFlop";	
		this.round = round++;

		$("#user-card1, #user-card2, #dealer-card1, #dealer-card2").attr("src", "images/cards/Mandolin_BACK.jpg");
		
		if (allInBlind === false) {
			this.pot = 500;
		} else if (user.bankroll <= 250) {
			$("#play-again-container").css("visibility", "hidden");
			this.pot = user.bankroll * 2;
			dealer.bankroll -= user.bankroll;
			user.bankroll -= user.bankroll;
			$("#bet-options *").css("visibility", "hidden");
			$("#pot p").html("pot: $" + this.pot).css("visibility", "visible");
			genChips("#pot-chips", game.pot);
			$("#message").html("All in").css({"visibility": "visible", "opacity": "1"});
		} else if (dealer.bankroll <= 250) {
			$("#play-again-container").css("visibility", "hidden");
			this.pot = dealer.bankroll * 2;
			user.bankroll -= dealer.bankroll;
			dealer.bankroll -= dealer.bankroll;
			$("#bet-options *").css("visibility", "hidden");
			$("#pot p").html("pot: $" + this.pot).css("visibility", "visible");
			genChips("#pot-chips", game.pot);
			$("#message").html("Dealer is all in").css("opacity", "1");
		} else {
			
		}

		$("#user p").html("$" + user.bankroll);
 		genChips("#user-chips", user.bankroll);
 		$("#dealer p").html("$" + dealer.bankroll);
 		genChips("#dealer-chips", dealer.bankroll);
	}

	function Player(playerName) {
		this.playerName = playerName;
		this.hand = null;
		this.bankroll = 10000;
		this.currentBet = 0;
		this.betHistory = {
			betsThisHand: 0,
			consecutivePreFlopBets: 0,
			betsPerHand: [],
			totalBetsInFiveHands: 0,
			betPreFlop: false,
			betFlop: false,
			betTurn: false,
			betRiver: false
		}
		this.playStyle = "normal";
		this.consecWins = 0;
		
		this.check = function() {

			if (this.playerName !== "dealer") {
				if (game.userTurn === "first") {
					setTimeout(function() {
						dealerTurn();
						$("#message").css("opacity", "1")
						$("bet-options buttons").css("visibility", "hidden");
					}, 400);
				} else {
					endTurn()
				}
				
    			$("#bet-form").css("visibility", "hidden");
			} else {
				if (game.turn === "preFlop" && game.pot === 1000) {
					// $("#user-bet-chips").css("transition", "bottom .4s linear");
	 				$("#user-bet-chips").addClass("add-pot").css("bottom", "450px");
				}
				if (game.userTurn === "first") {
					$("#message").html("dealer checks").css("visibility", "visible").delay(800).addClass("fade");
				} else {
					$("#message").html("dealer checks").css({"visibility": "visible", "opacity": "1"});
					$("#bet-options, #bet-options button").css("visibility","visible");
				}
				$("#check, #bet").show();
				if (game.pot !== 1000) {
					$("#check, #bet").css("visibility", "visible");		
				}
			}
		}

		this.bet = function(betAmount) {
			
			var smallBlind;
			if (betAmount === "small blind") {
				smallBlind = true;
				betAmount = 250;
			} else {
				smallBlind = false;
				var snd = new Audio("audio/chipsHandle6.wav");
				snd.play();
			}

			if (this.playerName !== "dealer") {
				if (betAmount >= user.bankroll) {
					betAmount = user.bankroll;
					game.pot += betAmount;
					user.bankroll -= betAmount;
				} else if (betAmount >= dealer.bankroll) {
					betAmount = dealer.bankroll;
					game.pot += betAmount;
					this.bankroll -= betAmount;
				} else {
					game.pot += betAmount + dealer.currentBet;
					this.bankroll -= betAmount + dealer.currentBet;
				}

				if (smallBlind !== true) {
					genChips("#user-bet-chips", betAmount + dealer.currentBet);
				} else {
					genChips("#pot-chips", game.pot);
				}
				this.currentBet = betAmount
				$("#user p").html("$" + this.bankroll);
				genChips("#user-chips", this.bankroll);

    			$("#pot p").css("visibility", "visible");
    			$("#bet-form").css("visibility", "hidden");

    			if (game.turn === "preFlop" && smallBlind === false) {
  					user.betHistory.betPreFlop = true;
    			} else if (game.turn === "flop") {
    				user.betHistory.betFlop = true;
    			} else if (game.turn === "turn") {
    				user.betHistory.betTurn = true;
    			} else if (game.turn === "river") {
    				user.betHistory.betRiver = true;
    			}

    			if (smallBlind === false) {
    				user.betHistory.totalBetsInFiveHands++;
    				user.betsThisHand++;
    			}

    			dealerTurn();

			} else {
				var action;
				var dealerAllIn;
				var userAllIn;
				
				// if the user has bet something, the dealer is "raising", if not the dealer is "betting"
				if (user.currentBet === 0) {
					action = "bets";
				} else {
					action = "raises";
				}

				// If the user's bet is equal to or exceeds the dealers bankroll, he cannot bet and instead must call
				if (user.currentBet >= dealer.bankroll) {
					dealer.call();
					return;
				}				

				// If the dealer's bet is equal to or exceeds his bankroll, he is all in and the bet is set to what the dealer had in his bankroll
				// The same applies for when the bet exceeds the user's bankroll
				// If the dealer has less than 500 chips or is about to after the bet, go all in
				// If the turn is pre-flop and dealer has less than 1000 chips and the user has bet, go all in
				// The same aplies for the user
				if (betAmount + user.currentBet >= dealer.bankroll) {
					betAmount = dealer.bankroll - user.currentBet;
					dealerAllIn = true;
				} else if (betAmount + user.currentBet >= user.bankroll) {
					betAmount = user.bankroll - user.currentBet;
					userAllIn = true;
				} else if (dealer.bankroll <= 500 || dealer.bankroll - betAmount <= 500) {
					betAmount = dealer.bankroll - user.currentBet;
					dealerAllIn = true;
				} else if (game.turn === "preFlop" && smallBlind === false && dealer.bankroll < 1000 && user.currentBet > 0) {
					dealerAllIn = true;
					betAmount = dealer.bankroll - user.currentBet;
				} else if (game.turn === "preFlop" && smallBlind === false && user.bankroll < 1000 && user.currentBet > 0) {
					userAllIn = true;
					betAmount = user.bankroll - user.currentBet;
				}
				
				this.currentBet = betAmount;

				// add to the pot the dealers raise plus the user's bet if he did so
				game.pot += betAmount + user.currentBet;

				// subtract the raise amount from the dealer's bankroll
				this.bankroll -= betAmount + user.currentBet;

				// update dealer's bankroll and generate betting chips
				$("#dealer p").html("$" + this.bankroll);
 				genChips("#dealer-chips", this.bankroll);
				$("#pot p").css("visibility", "visible");

    			if (dealerAllIn === true) {
    				$("#message").html("Dealer is all in <br> ($" + betAmount + ")");
    				$("#check, #bet, #raise").hide();
    				$("#call, #fold").show();
    				genChips("#dealer-bet-chips", betAmount + user.currentBet);
    			} else if (userAllIn === true && smallBlind === true) {
    				$("#message").html("Dealer posts big blind<br>Call small blind? ($" + betAmount + ")");
    				$("#check, #bet, #raise").hide();
					$("#call, #fold").show();
    			} else if (smallBlind === true) {
    				$("#message").html("Dealer posts big blind<br>Call small blind? ($" + betAmount + ")");
    				$("#check, #bet").hide();
					$("#call, #raise, #fold").show();
    			} else if (userAllIn === true) {
    				$("#message").html("Dealer puts you all in");
    				$("#call, #fold").show();
    				$("#check, #bet, #raise").hide();
    				genChips("#dealer-bet-chips", betAmount + user.currentBet);
    			} else {
    				$("#message").html("Dealer " + action + " $" + betAmount);
					$("#call, #raise, #fold").show();
					$("#check, #bet").hide();			
    				genChips("#dealer-bet-chips", betAmount + user.currentBet);
    			}
				
				$("#call, #raise, #fold").css("visibility", "visible");
		
				$("#message").css({"visibility": "visible", "opacity": "1"});
			}
			$("#pot p").html("pot: $" + game.pot).val();
		}

		this.call = function() {

			var snd = new Audio("audio/chipsStack1.wav");
			snd.play();

			if (this.playerName != "dealer") {
				$("#message").html("");
				this.bankroll -= dealer.currentBet;
				game.pot += dealer.currentBet;
				$("#user p").html("$" + this.bankroll);
 				genChips("#user-chips", this.bankroll);		
				genChips("#user-bet-chips", dealer.currentBet);

				// user is not calling small blind
				if (game.pot !== 1000) {
	    			$("#dealer-bet-chips").addClass("add-pot").css("bottom", "-100px");
	 				$("#user-bet-chips").addClass("add-pot").css("bottom", "450px");
	 			// dealer is all in
	 			} else if (dealer.bankroll === 0) {
					setTimeout(function() {
						$("#dealer-bet-chips").addClass("add-pot").css("bottom", "-100px");
	 					$("#user-bet-chips").addClass("add-pot").css("bottom", "450px");
					}, 500);
				} else {
					setTimeout(function() {
						dealerTurn();
					}, 500);
				}
    			
			} else {

				this.bankroll -= user.currentBet;
				game.pot += user.currentBet;
				
				$("#dealer p").html("$" + this.bankroll);
 				genChips("#dealer-chips", this.bankroll);
				// $("#pot p").html("pot: $" + game.pot).val();
				// genChips("#pot-chips", game.pot);
				
				if (game.userTurn === "second" && game.pot === 1000) {
	    			$("#message").html("dealer calls small blind").css({"visibility": "visible", "opacity": "1"});
    			} else {
					$("#message").html("dealer calls " + "$" + user.currentBet).css({"visibility": "visible", "opacity": "1"}); 			
				} 
				$("#bet-options, #bet-options button").css("visibility","visible");
				genChips("#dealer-bet-chips", user.currentBet);
				$("#bet-options button").hide();
				setTimeout(function(){
					if (game.userTurn === "first" || game.pot !== 1000) {
	    				$("#user-bet-chips").addClass("add-pot");
	 					$("#user-bet-chips").css("bottom", "450px");
    				} 
 					$("#dealer-bet-chips").addClass("add-pot");
 					$("#dealer-bet-chips").css("bottom", "-100px");
    			}, 100)

				if (game.turn === "river") {
					$("#message").addClass("fade");
				}
				if (dealer.bankroll === 0) {
					$("#message").html("Dealer is all in");
					endTurn();
					$("#bet-options *").hide();
					return;
				}
			}


		}

		this.fold = function () {

			// user folds
			if (this.playerName != "dealer") {	
				dealer.bankroll += game.pot;				
				$("#message").html("dealer wins $" + game.pot);
    			$("#bet-form").css("visibility", "hidden");
    			setTimeout(function(){
					$("#pot-chips img").addClass("add-pot");
					$("#pot-chips img").css("bottom", "220px");
				},300);

			// dealer folds
			} else {
				// call any bet $100 or less
				if (user.currentBet <= 100) {
					dealer.call();
					return;
				} else if (user.currentBet <= 200 && dealer.playStyle === "aggressive") {
					dealer.call();
					return;
				} else {
					user.bankroll += game.pot;
					$("#message").html("dealer folds: " + user.playerName + " wins $" + game.pot);
					setTimeout(function(){
						$("#pot-chips img").addClass("add-pot");
						$("#pot-chips img").css("bottom", "-355px");	
					},300);
				}
			}

			$("#user-bet-chips img, #dealer-bet-chips img").remove();
			$("#dealer #card1").html("<img src=" + dealer.hand[0].image+">");
			$("#dealer #card2").html("<img src=" + dealer.hand[1].image+">");
			$("#message").css({"visibility": "visible", "opacity": "1"});
			$("#bet-options *").css("visibility", "hidden");						
			$("#pot p").css("visibility", "hidden");
			return;
		}

		this.evalHand = function(draw = false) {

			var totalCards = [this.hand[0], this.hand[1]];
			
			$.each(game.cards, function(index, card) {
				totalCards.push(card);	
			});		
			
			var cardNumValues = [];
			$.each(totalCards, function(index, card) {
				cardNumValues.push(card.numValue);
			});
			var cardSuits = [];
			$.each(totalCards, function(index, card) {
				cardSuits.push(card.suit);
			});
	
			var quads;
			var trips;
			var pairs = []
			var tempCards = totalCards
			var hasQuads;
			var hasFullHouse;
			var hasTrips;
			var hasTwoPair
			var hasPair;
			checkPairs()
			function checkPairs() {
				var tempQuads;
				var tempTrips = []
				var tempPairs = []
				for (var i = 0; i < tempCards.length; ++i) {
					if (tempQuads !== undefined) {
						continue
					}
					if (tempTrips.length === 1) {
						if (tempCards[i].numValue === tempTrips[0].numValue) {
							continue
						}
					}
					if (tempPairs.length > 0) {
						if (tempCards[i].numValue === tempPairs[tempPairs.length - 1].numValue)
						continue;
					}  
					var pairCount = 0;
					for (var j = i+1;  j < tempCards.length; ++j) {

						if (tempCards[i].numValue === tempCards[j].numValue) {						
							pairCount++
						}
					}
					if (pairCount === 3) {
						tempQuads = tempCards[i]
					} else if (pairCount === 2) {
						tempTrips.push(tempCards[i])
					} else if (pairCount === 1) {
						tempPairs.push(tempCards[i])
					}
				}
				if (tempQuads !== undefined) {
					quads = tempQuads
					hasQuads = true
					return
				} else if (tempTrips.length === 1 && tempPairs.length === 2) {
					trips = tempTrips[0]
					if (tempPairs[0].numValue > tempPairs[1].numValue) {
						pairs.push(tempPairs[0])
					} else {
						pairs.push(tempPairs[1])
					}
					hasFullHouse = true
					return
				} else if (tempTrips.length === 2) {
					if (tempTrips[0].numValue > tempTrips[1].numValue) {
						trips = tempTrips[0]
						pairs.push(tempTrips[1])
					} else {
						trips = tempTrips[1]
						pairs.push(tempTrips[0])
					}
					hasFullHouse = true
					return
				} else if (tempTrips.length === 1 && tempPairs.length === 1) {
					trips = tempTrips[0]
					pairs.push(tempPairs[0])
					hasFullHouse = true;
					return
				} else if (tempTrips.length === 1) {
					trips = tempTrips[0]
					hasTrips = true
					return
				} else if (tempPairs.length === 3) {
					if (tempPairs[0].numValue > tempPairs[1].numValue && tempPairs[1].numValue > tempPairs[2].numValue) {
						pairs.push(tempPairs[0], tempPairs[1])
					} else if (tempPairs[0].numValue > tempPairs[2].numValue && tempPairs[2].numValue > tempPairs[1].numValue) {
						pairs.push(tempPairs[0], tempPairs[2])
					} else if (tempPairs[1].numValue > tempPairs[2].numValue && tempPairs[2].numValue > tempPairs[0].numValue) {
						pairs.push(tempPairs[1], tempPairs[2])
					} else if (tempPairs[1].numValue > tempPairs[0].numValue && tempPairs[0].numValue > tempPairs[2].numValue) {
						pairs.push(tempPairs[1], tempPairs[0])
					} else if (tempPairs[2].numValue > tempPairs[1].numValue && tempPairs[1].numValue > tempPairs[0].numValue) {
						pairs.push(tempPairs[2], tempPairs[1])
					} else {
						pairs.push(tempPairs[2], tempPairs[0])
					}
					hasTwoPair = true
					return
				} else if (tempPairs.length === 2) {
					if (tempPairs[0].numValue > tempPairs[1].numValue) {
						pairs.push(tempPairs[0], tempPairs[1])
					} else {
						pairs.push(tempPairs[1], tempPairs[0])
					}
					hasTwoPair = true
					return 
				} else if (tempPairs.length === 1) {
					pairs.push(tempPairs[0])
					hasPair = true
				}
			}

			
			var hasFlush;
			var hasFlushDraw;
			var flushSuit;
			var flush = checkFlush(totalCards, draw)
			// REDO
			// dealer has 5 high flush, user has 6 card flush (2, 8). only first card (2) is counted and dealer wins the hand
			function checkFlush(cards, draw = false) {

				var cardSuits = [];
				$.each(cards, function(index, card) {
					cardSuits.push(card.suit);
				});

				var topFlush;
				var orderedFlushDraw;
				
				hasFlush = false;

				for (var i = 0; i < cards.length; ++i) {
					var progressingFlush = [cards[i]];
					
					var currentFlush;
					var orderedFlush = [];
					for (var j = i+1; j < cards.length; ++j) {
						if (cardSuits[i] === cardSuits[j]) {
							if (progressingFlush.length <= 4) {
								progressingFlush.push(cards[j])
							
							} else {
								var flushNumbers = [];
								for (var x = 0; x < progressingFlush.length; ++x) {
									flushNumbers.push(progressingFlush[x].numValue)
								}

								if (cards[j].numValue > (Math.min(flushNumbers))) {
									var index = flushNumbers.indexOf(Math.min(flushNumbers))
									progressingFlush.splice(index, 1)	
									progressingFlush.push(cards[j])
								}

							}
							// flush
							if (progressingFlush.length === 5) {
								flushSuit = cardSuits[i];
								hasFlush = true;
								currentFlush = progressingFlush;
							// flush draw
							} else if (draw && progressingFlush.length === 4) {
								flushSuit = cardSuits[i];
								hasFlushDraw = true;
								currentFlush = progressingFlush;
							}
						}
					}
					if (currentFlush !== undefined && currentFlush.length >= 4) {
						var flushNumbers = [];			
						for (var x = 0; x < currentFlush.length; ++x) {
							flushNumbers.push(currentFlush[x].numValue);
						}
						for (var i = 0; i < cards.length; ++i)  {
							var index = flushNumbers.indexOf(Math.max(...flushNumbers));
							orderedFlush.push(currentFlush[index]);
							flushNumbers[index] = -Infinity;
						}

						if ((draw === false && topFlush === undefined) || ((topFlush !== undefined && orderedFlush !== undefined) && orderedFlush[orderedFlush.length - 1] > topFlush[topFlush.length - 1])) {
							topFlush = orderedFlush;
						} else if (draw) {
							orderedFlushDraw = orderedFlush;
						}
					}
				}
				if (hasFlush) {
					hasFlushDraw === false;
					return topFlush;
				} else if (hasFlushDraw) {
					return orderedFlushDraw;
				}
			}

			var straightHighCard = 0;
			var newlowCard;
			var topStraight = [];
			var straightDraw;
			var hasStraight = false;
			var hasInsideStraightDraw = false;
			var hasTwoWayStraightDraw = false;
			var hasOutsideStraightDraw = false;
			var straight = checkStraight(draw);
			console.log(hasOutsideStraightDraw)
			if (hasInsideStraightDraw === true && straight !== undefined) {

				var secondStraightDraw = checkStraight(true, newlowCard);
				
				if (secondStraightDraw !== undefined) {
					hasInsideStraightDraw = false;
					hasTwoWayStraightDraw = true;
					straight.push(secondStraightDraw[3]);
				}
			}
			
			function checkStraight(draw = false, lowCard = 0) {
				
				// for each card in play...
				for (var i = 0; i < totalCards.length; ++i) {
					
					// if the card does not equal the lostest card
					// in the last detected straight draw (if there is one)
					if (totalCards[i].numValue !== lowCard) {
						// create an 5 number array starting from the number of the selected card
						var straightArray = [];
						for (var q = 0; q < 5; ++q) {
							straightArray.push(totalCards[i].numValue + q);
						}
						// if the first card is an ace, the array will go from 14 to 5
						if (totalCards[i].value === "ace") {
							straightArray = [14, 2, 3, 4, 5];
						}

						var currentStraight = [];
						var x;
						var count = 0;
						var gap = 0;
						while(count < totalCards.length) {
							var noMatch = true;
							// go through each card in play and if there number value equals the next number in the array
							// assign that card to the "current straight" array and delete the number from the array of numbers
							for (var j = 0; j < totalCards.length; ++j) {
								
								if (straightArray[0] === totalCards[j].numValue) {
									currentStraight.push(totalCards[j]);
									
									straightArray.splice(0, 1);
									x = j;
									noMatch = false;
								}		
							}
							// if there has been no assignment in the previous loop, and the method is determining a draw
							// and there are no "gaps" in the straight yet
							if (draw && gap === 0 && noMatch) {
								currentStraight.push("gap");
								straightArray.splice(0, 1);
								++gap;
								x = j;
							}
							count++;
							
							// if these conditions have been met there is a straight
							if (currentStraight.length === 5 && currentStraight.contains("gap") === false) {
								hasStraight = true;
								if (totalCards[x].numValue > straightHighCard) {
									topStraight = currentStraight;
									straightHighCard = totalCards[x].numValue;
								}
							// if these conditions have been met there is some type of straight draw
							} else if ((currentStraight.length > 0) && currentStraight[0].numValue !== lowCard && ((draw && currentStraight.length === 5 && currentStraight.contains("gap")) || (draw && currentStraight.contains("gap") === false && currentStraight.length === 4))) {
	 							var gap = currentStraight.indexOf("gap");
	 							if (currentStraight.contains("gap")) {
									currentStraight.splice(gap, 1);
								}
	 							
								straightDraw = currentStraight;
								
								if ((straightDraw[0].numValue === straightDraw[1].numValue - 1 && straightDraw[1].numValue === straightDraw[2].numValue - 1 && straightDraw[2].numValue === straightDraw[3].numValue - 1) && (straightDraw[0].value !== "ace" && straightDraw[3].value !== "ace")) {
									hasOutsideStraightDraw = true;
								} else {
									hasInsideStraightDraw = true;
								}

								newlowCard = currentStraight[0].numValue;
								return straightDraw;
							}
						}
					} else {
						// delete if block
					}
				}


				if (hasStraight === true) {
					return topStraight;
				}
			}

			var hasStraightFlush = false;
			var hasStraightFlushDraw = false;
			var straightFlush = checkStraightFlush(draw)

			function checkStraightFlush(draw = false) {

				var straightFlush;
				var straightFlushDraw;
				if (draw === false) {
					var straight = checkStraight();
					if (hasStraight) {
						straightFlush = checkFlush(straight);					
					}
				} else {
					var straightDraw = checkStraight(true);

					if (hasInsideStraightDraw || hasOutsideStraightDraw || hasTwoWayStraightDraw) {
						straightFlushDraw = checkFlush(straightDraw, true);
					}
				}
				
				if (straightFlush !== undefined) {
					hasStraightFlush = true;
					return straightFlush;
				} else if (straightFlushDraw !== undefined) {
					hasStraightFlushDraw = true;

					return straightFlushDraw;
				}
			}
			

			function getKickers(numkickers, nonCount) {
				var tempCardNumValues = cardNumValues;
				var count = 0;
				var kickers = [];

				while (count < numkickers) {
					
					for (var i = 0; i < tempCardNumValues.length; ++i) {
						if (tempCardNumValues[i] === nonCount[0] || tempCardNumValues[i] === nonCount[1]) {
							tempCardNumValues[i] = -1;						
						}

					}
					var highestCard = Math.max(...tempCardNumValues)
					kickers.push(totalCards[tempCardNumValues.indexOf(highestCard)]);	
					tempCardNumValues[tempCardNumValues.indexOf(highestCard)] = -1;

					++count
				}	
				return kickers;	
				
			}

			if (draw) {
				if (hasStraightFlushDraw) {
					return {drawType: "straight flush", cards: straightFlush};
				} else if (hasFlushDraw && (hasInsideStraightDraw || hasOutsideStraightDraw || hasTwoWayStraightDraw)) {
					return {drawType: "straight and flush", cards: straight};
				} else if (hasFlushDraw) {
					return {drawType: "flush", cards: flush};
				} else if (hasOutsideStraightDraw || hasTwoWayStraightDraw) {
					return {drawType: "outside straight", cards: straight};
				} else if (hasInsideStraightDraw) {
					return {drawType: "inside straight", cards: straight};
				} else {
					return {drawType: "none", cards: dealer.cards}
				}
			} else {
				if (hasStraightFlush) {
					return [9, straightFlush, straightFlush[4].value, " has a high straight-flush"]
				} else if (hasQuads) { 
					return [8, quads, " has four " + quads.value + "s", getKickers(1, [quads.numValue, 0])]
				} else if (hasFullHouse) {		
					return [7, [trips, pairs[0]], " has a full house: " + trips.value + "s full of " + pairs[0].value + "s"]
				} else if (hasFlush && flush.length === 5) {
					return [6, flush, " has a " + flush[0].value +  " high flush"]
				} else if (hasStraight && straight.length === 5) {
					return [5, straight, " has a " + straight[4].value + " high straight"]
				} else if (hasTrips) {
					return [4, trips, " has three " + trips.value + "s", getKickers(2, [trips.numValue, 0])]
				} else if (hasTwoPair) {
					return [3, [pairs[0], pairs[1]], " has a pair of " + pairs[0].value + "s and a pair of " + pairs[1].value + "s", getKickers(1, [pairs[0].numValue, pairs[1].numValue])];	
				} else if (hasPair) {
					return [2, pairs[0], " has a pair of " + pairs[0].value + "s", getKickers(3, [pairs[0].numValue, 0])];
				} else {
					var highCard
					if (this.hand[0].numValue > this.hand[1].numValue) {
						highCard = this.hand[0];
					} else {
						highCard = this.hand[1];
					}
					var isHigher;
					for (var i = 0; i < game.cards.length; ++i)
					{
						if(highCard.numValue > game.cards[i].numValue) {
							isHigher = true;
							break;
						}
					}
					if (isHigher === true) {
						return [1, highCard, " has a high card " + highCard.value, getKickers(5, 0)]
					} else {
						return [0, , " has the board"]
					}
				}
			}
		}
	} 


	function shuffle () {
			var i = 0
		    , j = 0
		    , temp = null

		  for (i = deck.length - 1; i > 0; i -= 1) {
		    j = Math.floor(Math.random() * (i + 1));
		    temp = deck[i];
		    deck[i] = deck[j];
		    deck[j] = temp;
		  }
		}

	function dealComCards(cardNumber) {

		var cards = deal(1);	

		$.each(cards, function(index, value) {
			game.cards.push(value);
		});
		if (game.userTurn === "first") {
			$("#bet-options *").css("visibility", "hidden");
		}

		$("#com-cards #card" + cardNumber).attr("src", "images/cards/Mandolin_BACK.jpg");
		$("#com-cards #card" + cardNumber).css({"right": "0", "visibility": "visible"});
		var snd = new Audio("audio/cardPlace1.wav");
		snd.play();
		$("#com-cards #card" + cardNumber).addClass("in-play");
				
	}

	function sleep(miliseconds) {
   		var currentTime = new Date().getTime();
		
		while (currentTime + miliseconds >= new Date().getTime()) {
	   
	   }
	}

	function median(values) {

		if (values.length === 4) {
			var index = values.indexOf(Math.min(values));
			values.splice(index, 1);
		}

	    values.sort( function(a,b) {return a - b;} );

	    var half = Math.floor(values.length/2);

	    if(values.length % 2) {
	        return values[half];
	    } else {
	        return (values[half-1] + values[half]) / 2.0;
	    }
	}

	function dealerTurn() {

		const randomInt =  (20 * Math.floor(Math.random() * 6));
		const draw = true;
		var communityDraws = false;
		var communityStraightFlushDraw = false;
		var communityStraightAndFlushDraw = false;
		var communityFlushDraw = false;
		var communityOutsideStraightDraw = false;
		var communityInsideStraightDraw = false
		var straightFlushDraw = false;
		var straightAndFlushDraw = false;
		var flushDraw = false;
		var outsideStraightDraw = false;
		var insideStraightDraw = false;


		$("#message").css("visibility", "hidden");
		$("#bet-options *").css("visibility", "hidden");
			
			// Turn is pre-flop and the dealer is big blind	and the user has checked	
			if (game.turn === "preFlop" && user.currentBet === 0) {
				// console.log(dealer.hand)
				// pocket aces
			 	if (dealer.hand[0].numValue === 14 && dealer.hand[1].numValue === 14) {
				 	dealer.bet(350 + randomInt);		 
				// pocket kings, queens, or jackets
				} else if ((dealer.hand[0].numValue === 13 || dealer.hand[0].numValue === 12 || dealer.hand[0].numValue === 11) && dealer.hand[0].numValue === dealer.hand[1].numValue) {					
					dealer.bet(300 + randomInt);
				// suited connectors or suited and both cards higher than 10
				} else if(dealer.hand[0].suit === dealer.hand[1].suit && ((dealer.hand[0].numValue > 10 && dealer.hand[1].numValue > 10) && (dealer.hand[0].numValue === dealer.hand[1].numValue + 1) || (dealer.hand[1].numValue === dealer.hand[0].numValue + 1))) {					
					dealer.bet(300 + randomInt);
				// pocket 10s, 9s, 8s, or 7s
				} else if ((dealer.hand[0].numValue === 10 || dealer.hand[0].numValue === 9 || dealer.hand[0].numValue === 8 || dealer.hand[0].numValue === 7) && dealer.hand[0].numValue === dealer.hand[1].numValue) {					
					dealer.bet(250 + randomInt);
				// pocket pair lower than 7s
				} else if (dealer.hand[0].numValue === dealer.hand[1].numValue) {
					if (dealer.playStyle === "aggressive" || Math.floor(Math.random() * 2) === 1) {
						dealer.bet(200 + randomInt);
					} else {
						dealer.check();
					}
				// 10 or higher and queen and higher
				} else if((dealer.hand[0].numValue > 12 && dealer.hand[1].numValue > 9) || (dealer.hand[0].numValue > 9 && dealer.hand[1].numValue > 12)) {
					dealer.bet(200 + randomInt);
				// hand contains an ace
				} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {	
					if (Math.floor(Math.random() * 2) === 1) {
						dealer.bet(200 + randomInt);
					} else {
						dealer.check();
					}
				// user bet pre-flop the last two hands
				} else if (user.betHistory.consecutivePreFlopBets >= 2) {					
					dealer.bet(200 + randomInt);
				//  dealer has more than 3000 chips than user bluff one out of four times
				} else if (dealer.bankroll >= user.bankroll + 3000 && Math.floor(Math.random() * 3) === 0) {
					dealer.bet(300 + randomInt);
				// dealer is aggressive and randomly bets
				} else if (dealer.playStyle === "aggressive" && Math.floor(Math.random() * 3) > 1) {
					dealer.bet(200 + randomInt);
				} else {
					dealer.check();
				}

			// Turn is pre-flop and the dealer is small blind or the user has bet
			} else if (game.turn === "preFlop" && user.currentBet > 0) {	
				// console.log(dealer.hand)
				// Dealer is small blind
				if ((game.pot === 750 && user.currentBet === 250) || (user.currentBet <= 250 && user.bankroll === 0)) {	
					// pocket aces
					if (dealer.hand[0].numValue === 14 && dealer.hand[1].numValue === 14) {
				 		dealer.bet(350 + randomInt);		 
					// pocket kings, queens, or jackets
					} else if ((dealer.hand[0].numValue === 13 || dealer.hand[0].numValue === 12 || dealer.hand[0].numValue === 11) && dealer.hand[0].numValue === dealer.hand[1].numValue) {		
						dealer.bet(300 + randomInt);
					// suited connectors or suited and both cards higher than 10
					} else if(dealer.hand[0].suit === dealer.hand[1].suit && ((dealer.hand[0].numValue > 10 && dealer.hand[1].numValue > 10) || (dealer.hand[0].numValue === dealer.hand[1].numValue + 1) || (dealer.hand[1].numValue === dealer.hand[0].numValue + 1))) {
						dealer.bet(300 + randomInt);
					// pocket 10s, 9s, 8s,or 7s
					} else if ((dealer.hand[0].numValue === 10 || dealer.hand[0].numValue === 9 || dealer.hand[0].numValue === 8 || dealer.hand[0].numValue === 7) && dealer.hand[0].numValue === dealer.hand[1].numValue) {					
						dealer.bet(250 + randomInt);
					// pocket pair lower than 7s
					} else if (dealer.hand[0].numValue === dealer.hand[1].numValue) {
						if (dealer.playStyle === "aggressive" || Math.floor(Math.random() * 6) > 1) {
							dealer.bet(200 + randomInt);
						} else {
							dealer.check();
						}
					// 10 or higher and queen and higher
					} else if((dealer.hand[0].numValue > 12 && dealer.hand[1].numValue > 9) || (dealer.hand[0].numValue > 9 && dealer.hand[1].numValue > 12)) {
						dealer.bet(200 + randomInt);
					// hand contains an ace
					} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
						if (dealer.hand[0].numValue > 6 || dealer.hand[1].numValue > 6)
							dealer.bet(200 + randomInt);
						else if (dealer.playStyle === "aggressive" || Math.floor(Math.random() * 2) === 0) {
							dealer.bet(200 + randomInt);
						} else {
							dealer.check();
						}
					// user bet pre-flop the last two hands
					} else if (user.betHistory.consecutivePreFlopBets >= 2) {
						dealer.bet(200 + randomInt);
					// both cards are lower than 5 and are not pocket or suited
					} else if ((dealer.hand[0].numValue <= 5 && dealer.hand[1].numValue <= 5) && (dealer.hand[0].numValue !== dealer.hand[1].numValue) && (dealer.hand[0].suit !== dealer.hand[1].suit)) {
						dealer.fold();
					// dealer is aggressive and bets randomly
					} else if (dealer.playStyle === "aggressive" && Math.floor(Math.random() * 5) > 2) {
						dealer.bet(200 + randomInt);
					} else {
						dealer.call();
					}

				// User raises
				// pocket pair higher than jacks
				} else if((dealer.hand[0].numValue > 11 && dealer.hand[0].numValue === dealer.hand[1].numValue)) {			
					if (user.currentBet <= 1300) {
						if (dealer.playStyle === "aggressive" || Math.floor(Math.random() * 4) === 0) {
							dealer.bet(user.currentBet * 2);
						} else if (Math.floor(Math.random() * 3) === 0) {
							dealer.bet(300 + randomInt);
						} else {
							dealer.bet(user.currentBet);
						}
					} else if (dealer.hand[0].value === "ace") {
						dealer.bet(user.currentBet);
					} else {
						dealer.call();
					}
				// ace king suited
				} else if ((dealer.hand[0].value === "ace" && dealer.hand[1].value === "king" || dealer.hand[1].value === "ace" && dealer.hand[0].value === "king") && dealer.hand[0].suit === dealer.hand[1].suit) {
					if (user.currentBet <= 1000) {
						if (dealer.playStyle === "aggressive") {
							if (Math.floor(Math.random() * 2) === 0) {
								dealer.bet(user.currentBet);
							} else {
								dealer.bet(700 + randomInt);
							}
						} else {
							dealer.bet(400 + randomInt);
						}
					} else {
						dealer.call();
					}
				// pocket 7s, 8s, 9s, 10s, or jacks
				} else if ((dealer.hand[0].numValue === 7 || dealer.hand[0].numValue === 8 || dealer.hand[0].numValue === 9 || dealer.hand[0].numValue === 10 || dealer.hand[0].numValue === 11) && (dealer.hand[0].numValue === dealer.hand[1].numValue)) {
					if (dealer.playStyle === "aggressive" && user.currentBet <= 2000) {
						dealer.bet(500 + randomInt);	
					} else {
						dealer.call();
					}
				// hand contains ace plus king, queen, jack, or 10
				} else if ((dealer.hand[0].numValue === 14 || dealer.hand[1].numValue === 14) && ((dealer.hand[0].numValue === 13 || dealer.hand[0].numValue === 12 || dealer.hand[0].numValue === 11 || dealer.hand[0].numValue === 10) || (dealer.hand[1].numValue === 13 || dealer.hand[1].numValue === 12 || dealer.hand[1].numValue === 11 || dealer.hand[1].numValue === 10))) {
					if (user.currentBet < 800) {
						if (dealer.playStyle === "aggressive") {
							if (dealer.hand[0].suit === dealer.hand[1].suit) {
								dealer.bet(user.currentBet);
							} else {
								dealer.bet(400 + randomInt);
							}
						} else {
							dealer.call();
						}
					} else if (dealer.playStyle === "aggressive") { 
						dealer.bet(300 + randomInt);
					} else {
						dealer.call();
					}
				// both cards are higher than 10s
				} else if (dealer.hand[0].numValue > 11 && dealer.hand[1].numValue > 11) {
					if (dealer.playStyle === "aggressive") {
						if (user.currentBet < 1000) {
							if (Math.floor(Math.random() * 2) === 0) {
								dealer.bet(user.currentBet);
							} else {
								dealer.bet(400 + randomInt);
							}
						} else {
							dealer.call();
						}
					} else if ((dealer.hand[0].numValue === dealer.hand[1].numValue + 1 || dealer.hand[1].numValue === dealer.hand[0].numValue + 1) && dealer.hand[0].suit === dealer.hand[1].suit) {
						if (Math.floor(Math.random() * 3) > 0) {
							dealer.bet(400 + randomInt);
						} else {
							dealer.call();
						}
					} else {
						dealer.call();
					}
				// suited connectors higher than 6
				} else if ((dealer.hand[0].numValue < 6 && dealer.hand[1].numValue < 6) && (dealer.hand[0].suit === dealer.hand[1].suit) && ((dealer.hand[0].numValue === dealer.hand[1].value + 1) (dealer.hand[1].numValue === dealer.hand[0].value + 1))) {
					if (dealer.playStyle === "aggressive") {
						if (user.currentBet < 1000) {
							dealer.bet(500 + randomInt);
						} else {
							dealer.call();
						}
					} else if (user.currentBet <= 2000) {
						dealer.call();
					}
				// hand contains ace
				} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
					if (dealer.playStyle === "aggressive" && Math.floor(Math.random() * 2) === 0) {
						if (user.currentBet < 1500) {
							dealer.bet(300 + randomInt);
						} else {
							dealer.call();
						}
					} else if (user.currentBet <= 3000) {
						dealer.call();
					} else {
						dealer.fold();
					}		
				// user bet pre-flop the last two hands
				} else if (user.betHistory.consecutivePreFlopBets >= 2) {					
					dealer.bet(300 + randomInt);
				// dealer is aggressive randomly bets
				} else if (dealer.playStyle === "aggressive" && Math.floor(Math.random() * 6) > 1) {
					dealer.bet(300 + randomInt);
				// hand contains a king or queen
				} else if (dealer.hand[0].numValue > 12 || dealer.hand[0].numValue > 13 || dealer.hand[1].numValue > 12 || dealer.hand[1].numValue > 13) {
					if (user.currentBet <= 1000) {
						dealer.call();
					} else {
						dealer.fold();
					}
				// both cards are higher than 7
				} else if (dealer.hand[0].numValue > 7 && dealer.hand[1].numValue > 7) {
					if (user.currentBet <= 400) {
						dealer.call();
					} else {
						dealer.fold();
					}
				// any suited connectors
				} else if ((dealer.hand[0].numValue + 1 === dealer.hand[1].numValue || dealer.hand[1].numValue + 1 === dealer.hand[0].numValue) && (dealer.hand[0].suit === dealer.hand[1].suit)) {
					if (user.currentBet <= 700) {
						dealer.call();
					} else {
						dealer.fold();
					}
				} else { 
					dealer.fold();
				}

			// turn is flop and dealer is big blind and user hasn't bet or dealer is small blind
			} else if (game.turn === "flop" && user.currentBet === 0) {

				dealer.hand[0] = {value: "five", numValue: 11, suit: "club", image: "image"};
				dealer.hand[1] = {value: "two", numValue: 13, suit: "club", image: "image"};
				game.cards[0] = {value: "ace", numValue: 14, suit: "club", image: "image"};
				game.cards[1] = {value: "seven", numValue: 12, suit: "diamond", image: "image"};
				game.cards[2] = {value: "three", numValue: 5, suit: "spade", image: "image"};
			
				// console.log(dealer.hand, game.cards)
				
				var drawInfo = dealer.evalHand(draw);
				console.log(drawInfo);

				var straightFlushDraw = false;
				var straightAndFlushDraw = false;
				
				// if the dealer's hand contains one of the draw cards then the dealer is on an open straight flush draw or straight and flush draw
				
				if (drawInfo.drawType === "straight flush" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					straightFlushDraw = true;
				} else if (drawInfo.drawType === "straight and flush" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					straightAndFlushDraw = true;
				} 

				// 1 or 2 dementional array representing the information of the dealers hand
				var dealerHandInfo = dealer.evalHand();
				
				//  dealer is aggressive and catches a straight or flush on the flop
				if (dealer.playStyle = "aggressive" && (dealerHandInfo[0] === 6 || dealerHandInfo[0] === 5)) {
					dealer.bet(300 + randomInt);
				// flops a straight flush, four of a kind, full house, flush, or straight flush... slow play most of the time
				} else if (dealerHandInfo[0] === 9 || dealerHandInfo[0] === 8 || dealerHandInfo[0] === 7 || dealerHandInfo[0] === 6 || dealerHandInfo[0] === 5) {
					if (dealer.playStyle = "aggressive" || Math.floor(Math.random() * 4) === 0) {
						dealer.bet(300 + randomInt);
					} else {
						dealer.check();
					}
				// three of a kind
				} else if (dealerHandInfo[0] === 4) {
					// hand contains at least of the trips
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {					
						if (Math.floor(Math.random() * 2) === 0 || dealerHandInfo[0].value !== "ace") {
							dealer.bet(300 + randomInt);
						// slow play
						} else {
							dealer.check();
						}					
					// hand does not contain an one of the trips but hand contains an ace
					} else if ((dealerHandInfo[1].numValue !== dealer.hand[0].numValue || dealerHandInfo[1].numValue !== dealer.hand[1].numValue) && (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace" || dealer.hand[0].value === "king" || dealer.hand[1].value === "king")) {
						dealer.bet(300 + randomInt);
					} else {
						// bluff
						if (dealer.playStyle === "aggressive" && Math.floor(Math.random() * 3) > 0) {
							dealer.bet(300 + randomInt);
						} else {
							dealer.check();
						}
					}
				// two pair
				} else if (dealerHandInfo[0] === 3) {
					//  each hand card make up a pair with a community card
					if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) && (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
						if (Math.floor(Math.random() * 2) === 0) {
							dealer.bet(400 + randomInt);
						// slow play
						} else {
							dealer.check();
						}
					//  hand contains one pair with a community card
					} else if (dealer.hand[0].numValue !== dealer.hand[1].numValue) {
						dealer.bet(350 + randomInt);	
					// pocket pair higher than the highest community card
					} else if (dealer.hand[0].numValue > Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue)) {
						dealer.bet(250 + randomInt);
					// pocket pair higher the kicker ("non pair") on the board and higher than 6
					} else if (dealer.hand[0].numValue > 6 && dealer.hand[0].numValue > dealerHandInfo[3][0].numValue) {
						dealer.bet(200 + randomInt);
					} else {
						// bye out the pot before user catches something
						if (dealer.playStyle === "aggressive" || Math.floor(Math.random() * 3) === 0) {
							dealer.bet(400 + randomInt);
						} else {
							dealer.check();
						}
					}
				// pair
				} else if (dealerHandInfo[0] === 2) {
					// not a acommunity card pair
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
						// pocket pair higher than highest community card
						if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue)) {
							dealer.bet(300 + randomInt);
						// some pair (pocket or otherwise) equal to or higher than middle community card
						} else if (dealerHandInfo[1].numValue >= median([game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue])) {
							dealer.bet(200 + randomInt);
						} else {
							// pair is lowest pair and user is small blind (and therefore checked)
							if (game.userTurn === "first") {
								// push the user out before he catches something
								if (dealer.playStyle === "aggressive" || Math.floor(Math.random() * 2) === 0) {
									dealer.bet(300 + randomInt);
								// dealer is aggressive (two out of three times) or kicker is higher than highest community card (one out of two times)
								} else if (((dealer.playStyle === "aggressive" && Math.floor(Math.random() * 3) > 0) || ((dealer.hand[0].numValue > Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue) || dealer.hand[1].numValue > Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue)) && (Math.floor(Math.random() * 2 === 0))))) {
									dealer.bet(200 + randomInt);
								} else {
									dealer.check();
								}
							// dealer is small blind
							} else {
								if (dealer.playStyle === "aggressive" && Math.floor(Math.random() * 3) > 0) {
									dealer.bet(300 + randomInt);
								} else {
									dealer.check(); 
								}
							}
						}
					// community card pair
					} else {
						// user has checked and someone has bet preflop
						if (game.userTurn === "second" && game.pot > 1000) {
							// both cards are higher than a jack
							if (dealer.hand[0].numValue > 11 && dealer.hand[1].numValue > 11 && Math.floor(Math.random() * 3) === 0) {
								dealer.bet(350 + randomInt);
							} else if (Math.floor(Math.random() * 5 > 1) && (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace")) {
							// bluff
							} else if ((Math.floor(Math.random() * 10) === 0) || (dealer.playStyle === "aggressive" && Math.floor(Math.random() * 2) === 0)) {
								dealer.bet(350 + randomInt);
							} else {
								dealer.check();
							}
						} else {
							dealer.check();
						}
					}
				// straight-flush draw or straight and flush draw
				} else if (straightFlushDraw || straightAndFlushDraw) {
					dealer.bet(300 + randomInt); 
				} else {
					// user is small blind (and therefore checked) and dealer is aggressive and both cards are higher than a 10
					if (game.userTurn === "first" && dealer.playStyle === "aggressive" && (dealer.hand[0].numValue > 10 && dealer.hand[1].numValue > 10)) {
						dealer.bet(200 + randomInt);
					} else {
						dealer.check();
					}	
				}
			// dealer is small or big blind and user has bet
			} else if (game.turn === "flop" && user.currentBet > 0) {

				// draw info
				var drawInfo = dealer.evalHand(draw);

				// if dealer's hand contains one of the draw cards then the dealer is on an open straight flush draw or straight and flush draw or a flush draw or straight draw
				if (drawInfo.drawType === "straight flush" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					straightFlushDraw = true;
				} else if (drawInfo.drawType === "straight and flush" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					straightAndFlushDraw = true;
				} else if (drawInfo.drawType === "flush" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					flushDraw = true;
				} else if (drawInfo.drawType === "outside straight" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					outsideStraightDraw = true;
				} 
				
				
				// hand info
				var dealerHandInfo = dealer.evalHand();

				// dealer flops flush or straight
				if (dealerHandInfo[0] === 6 || dealerHandInfo[0] === 5) {
					// raise if aggressive, slow play if not
					if (dealer.playStyle === "aggressive") {
						dealer.bet(user.currentBet);
					} else {
						dealer.call();
					}
				// slow play on straight flush, four of a kind, or full house, 
				} else if (dealerHandInfo[0] === 9 || dealerHandInfo[0] === 8 || dealerHandInfo[0] === 7) {
					dealer.call()
				// three of a kind		
				} else if (dealerHandInfo[0] === 4) {
					// dealer hand contains one of the trips
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
						// three community cards of the same suit and user bets more than 3000 and dealer is not not aggressive
						if (game.cards[0].suit === game.cards[1].suit && game.cards[1].suit === game.cards[2].suit && user.currentBet >= 3000 && dealer.playStyle !== "aggressive") {
							dealer.fold();
						// raise 2/3 of the time or else slow play
						} else if (Math.floor(Math.random() * 3) > 0 || dealer.playStyle === "aggressive") {
							dealer.bet(200 + randomInt);
						} else {
							dealer.call();
						}
					// all trips are community cards but dealer has an ace or two face cards
					} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace" || (dealer.hand[0].numValue >= 11  && dealer.hand[1].numValue >= 11)) {
						if (user.currentBet <= 2000 || dealer.playStyle === "aggressive") {
							dealer.call();
						} else {
							dealer.fold();
						}
					} else {
						dealer.fold();
					}
				// two pair
				} else if (dealerHandInfo[0] === 3) {

					//  each hand card make up a pair with a community card
					if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) && (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
						dealer.bet(400 + randomInt);
					//  hand contains one pair with a community card
					} else if (dealer.hand[0].numValue !== dealer.hand[1].numValue) {
						// the pair in the dealer's hand is greater than the community card pair
						if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > dealerHandInfo[1][1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > dealerHandInfo[1][0].numValue) || (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > dealerHandInfo[1][1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > dealerHandInfo[1][0].numValue)) {
							// kicker is higher than a queen
							if ((dealer.hand.contains(dealerHandInfo[3][0]) && dealerHandInfo[3][0].numValue > 12) || dealer.playStyle === "aggressive" ) {
								if (user.currentBet < 2000) {
									dealer.bet(350 + randomInt);
								} else {
									dealer.call();
								}
							// kicker is lower than a queen
							} else {
								if (user.currentBet < 3000 || dealer.playStyle === "aggressive" || Math.floor(Math.random() * 4) > 0) {
									dealer.call();
								// on a draw
								} else {
									dealer.fold();
								}
							}
						// pair in the dealer's hand is not greater than the community card pair
						} else {
							if (user.currentBet <= 2000 || dealer.playStyle === "aggressive" || Math.floor(Math.random() * 6) > 2) {
								dealer.call();
							} else {
								dealer.fold();
							}
						}
					// pocket pair higher than the highest community card
					} else if (dealer.hand[0].numValue > Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue)) {
						if (user.currentBet <= 2000 && (dealer.playStyle === "aggressive" || Math.floor(Math.random() * 2) === 0)) {
							dealer.bet(user.currentBet);
						} else {
							dealer.call();
						}
					// pocket pair higher than the kicker ("non pair") on the board and higher than 6
					} else if (dealer.hand[0].numValue > 6 && dealer.hand[0].numValue > dealerHandInfo[3][0].numValue) {
						if (user.currentBet <= 2000 && (dealer.playStyle === "aggressive" || Math.floor(Math.random() * 4) === 0)) {
							dealer.bet(200 + randomInt);
						} else {
							dealer.call();
						}
					// pocket pair lower than the kicker on the board
					} else {
						if ((dealer.playStyle === "aggressive" && user.currentBet <= 3000) || (Math.floor(Math.random() * 3) === 0 && user.currentBet <= 1000)) {
							dealer.call();
						} else {
							dealer.fold();
						}
					}
				// pair
				} else if (dealerHandInfo[0] === 2) {
					// not a community card pair
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
						// pocket pair higher than highest community card
						if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue)) {
							if (user.currentBet < 1000 || (dealer.playStyle === "aggressive" && user.currentBet <= 2000)){
								if (Math.floor(Math.random() * 2) === 0) {
									dealer.bet(user.currentBet);
								} else {
									dealer.bet(300 + randomInt);
								}
							} else {
								dealer.call();
							}
						// top pair
						} else if (dealerHandInfo[1].numValue === Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue)) {
							// kicker is a queen or higher
							if ((dealer.hand[0].numValue !== dealerHandInfo[1].numValue && dealer.hand[0].numValue >= 12) || dealer.hand[1].numValue !== dealerHandInfo[1].numValue && dealer.hand[1].numValue >= 12) {
								if (Math.floor(Math.random() * 2) === 0) {
									dealer.bet(user.currentBet);
								} else {
									dealer.bet(300 + randomInt);
								}
							} else {
								if (user.currentBet <= 3000 || dealer.playStyle === "aggressive" || Math.floor(Math.random() * 2) === 0) {
									dealer.call();
								// on a draw
								} else if (straightFlushDraw || straightAndFlushDraw) {
									dealer.call();	
								} else if (user.currentBet <= 3000 && (flushDraw || outsideStraightDraw)) {
									dealer.call()
								} else {
									dealer.fold();
								}	
							}
						// some pair (pocket or otherwise) equal to or higher than middle community card
						} else if (dealerHandInfo[1].numValue >= median([game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue])) {
							if (dealer.playStyle === "aggressive" && user.currentBet <= 2000) {
								dealer.call();
							} else if (dealer.bankroll >= 4000 && user.currentBet <= 1000 && Math.floor(Math.random() * 4) > 0) {
								dealer.call();
							// on a draw
							} else if (straightFlushDraw || straightAndFlushDraw) {
								dealer.call();
							} else if (user.currentBet <= 2000 && (flushDraw || outsideStraightDraw)) {
								dealer.call();
							} else {
								dealer.fold();
							}
						// lowest pair (or pockets between lowest and middle)
						} else {
							// on a draw
							if (straightFlushDraw || straightAndFlushDraw) {
								dealer.call();
							} else if (user.currentBet <= 1000 && (flushDraw || outsideStraightDraw) && Math.floor(Math.random() * 2) === 0) {
								dealer.call();
							} else if (user.currentBet <= 2500 && (flushDraw || outsideStraightDraw) && Math.floor(Math.random() * 3) === 0) {
								dealer.call();
							} else {
								dealer.fold();
							}
						}
					// community card pair
					} else {
						if (straightFlushDraw || straightAndFlushDraw) {
							dealer.call();
						} else if (user.currentBet <= 2000 && (flushDraw || outsideStraightDraw) && Math.floor(Math.random() * 2) === 0) {
							dealer.call();
						} else {
							dealer.fold();
						}
					}
				// on a draw
				} else if (straightFlushDraw || straightAndFlushDraw) {
					dealer.call();
				} else if (user.currentBet <= 2000 && (flushDraw || outsideStraightDraw) && Math.floor(Math.random() * 2) === 0) {
				  	dealer.call();
				} else {
					dealer.fold();
				}
			} else if (game.turn === "turn" && user.currentBet === 0) {
				
				var drawInfo = dealer.evalHand(draw);
				
				if (drawInfo.cards.contains(dealer.hand[1]) === false && drawInfo.cards.contains(dealer.hand[1]) === false) {
					if (drawInfo.drawType === "straight flush") {
						communityStraightFlushDraw = true;
					} else if (drawInfo.drawType === "straight and flush") {
						communinityStraightAndFlushDraw = true;
					} else if (drawInfo.drawType === "flush") {
						communityFlushDraw = true;
					} else if (drawInfo.drawType === "outside straight") {
						communityOutsideStraightDraw = true;
					} else if (drawInfo.drawType === "inside straight") {
						communityInsideStraightDraw;
					} else {
						console.log("some other draw");
					}
					communityDraws = true;
				}

				if (drawInfo.drawType === "straight flush" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					straightFlushDraw = true;
				} else if (drawInfo.drawType === "straight and flush" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					straightAndFlushDraw = true;
				}
				var dealerHandInfo = dealer.evalHand()


				if (dealerHandInfo[0] === 9 || dealerHandInfo[0] === 8 || dealerHandInfo[0] === 7) {
					dealer.bet(800 + randomInt);
				} else if (dealerHandInfo[0] === 6) {
					if (communityFlushDraw === false || communityStraightAndFlushDraw === false || communityStraightFlushDraw === false) {
						dealer.bet(800 + randomInt);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 11) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].numValue > 11)) {
						dealer.bet(750 + randomInt);
					} else if (dealer.playStyle === "aggressive" || ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 5) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].numValue > 8))) {
						dealer.bet(400 + randomInt);
					} else if (game.userTurn === first) {
						dealer.bet(300 + randomInt);
					} else {
						dealer.check();
					}
				} else if (dealerHandInfo[0] === 5) {
					if (communityFlushDraw === false && communityStraightAndFlushDraw === false && communityStraightFlushDraw === false) {
						if (dealerHandInfo[1].contains(dealer.hand[0]) && dealerHandInfo[1].contains(dealer.hand[1])) {
							dealer.bet(750 + randomInt);
						} else if ((dealer.hand[0] === dealerHandInfo[1][4]) || (dealer.hand[1] === dealerHandInfo[1][4])) { 
							dealer.bet(700 + randomInt);					
						} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0] !== dealerHandInfo[1][0]) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1] !== dealerHandInfo[1][0])) { 
							dealer.bet(700 + randomInt);					
						} else {
							dealer.check();
						}
					} else {
						dealer.check();
					}	
				} else if (dealerHandInfo[0] === 4) {
					if (communityDraws === false) {	
						if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {									
							if (dealerHandInfo[1].numValue > 11) {
								dealer.bet(550 + randomInt);
							} else if (dealerHandInfo[1].numValue > 7) {
								dealer.bet(480 + randomInt);
							} else {
								dealer.bet(400 + randomInt);
							}					
						} else {
							dealer.check();
						}
					} else {
						dealer.check();
					}
				} else if (dealerHandInfo[0] === 3) {
					if (communityDraws === false) {
						if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
							dealer.bet(400 + randomInt);	
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 7)) {
							dealer.bet(300 + randomInt);	
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1]) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
							dealer.check();
						} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
							dealer.bet(200 + randomInt);	
						} else {
							dealer.check();
						}
					} else {
						dealer.check()
					}
				} else if (dealerHandInfo[0] === 2) {
					if (communityDraws === false) {
						if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
							if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue)) {
								dealer.bet(150 + randomInt);
							} else if (dealerHandInfo[1].numValue > 10) {
								dealer.bet(100 + randomInt);
							} else {
								dealer.check();
							}
						} else {
							dealer.check();
						}
					} else {
						dealer.check();
					}
				} else {
					dealer.check();
				}
			} else if (game.turn === "turn" && user.currentBet > 0) {


				var drawInfo = dealer.evalHand(draw)
				if (drawInfo.drawType === "straight flush" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					straightFlushDraw = true;
				} else if (drawInfo.drawType === "straight and flush" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					straightAndFlushDraw = true;
				} else if (drawInfo.drawType === "flush" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					flushDraw = true;
				} else if (drawInfo.drawType === "outside straight" && (drawInfo.cards.contains(dealer.hand[0]) || drawInfo.cards.contains(dealer.hand[1]))) {
					outsideStraightDraw = true;
				}

				if (drawInfo.cards.contains(dealer.hand[1]) === false && drawInfo.cards.contains(dealer.hand[1]) === false) {
					if (drawInfo.drawType === "straight flush") {
						communityStraightFlushDraw = true;
					} else if (drawInfo.drawType === "straight and flush") {
						communinityStraightAndFlushDraw = true;
					} else if (drawInfo.drawType === "flush") {
						communityFlushDraw = true;
					} else if (drawInfo.drawType === "outside straight") {
						communityOutsideStraightDraw = true;
					} else if (drawInfo.drawType === "inside straight") {
						communityInsideStraightDraw;
					} else {
						console.log("some other draw");
					}
					communityDraws = true;
				}
				
				
				var dealerHandInfo = dealer.evalHand()
				if (dealerHandInfo[0] === 9 || dealerHandInfo[0] === 8 || dealerHandInfo[0] === 7) {
					dealer.bet(user.currentBet + (500 + randomInt));
				} else if (dealerHandInfo[0] === 6) {
					if ((communityStraightAndFlushDraw === false && communityStraightFlushDraw === false) && (communityFlushDraw === false || (dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].value === "ace" || dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value === "ace"))) {
						dealer.bet(user.currentBet);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 11) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].numValue > 11)) {
						dealer.bet(200 + randomInt);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 6) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].numValue > 6)) {
						if (user.currentBet <= 500) {
							dealer.call();
						} else {
							dealer.fold();
						}
					} else {
						dealer.fold();
					}
				} else if (dealerHandInfo[0] === 5) {
					if (communityFlushDraw === false || StraightAndFlushDraw === false || communityStraightFlushDraw === false) {
						if (dealerHandInfo[1].contains(dealer.hand[0]) && dealerHandInfo[1].contains(dealer.hand[1])) {
							dealer.bet(user.currentBet + (300 + randomInt));
						} else if ((dealer.hand[0] === dealerHandInfo[1][4]) || (dealer.hand[1] === dealerHandInfo[1][4])) { 
							dealer.bet(user.currentBet(200 + randomInt));					
						} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0] !== dealerHandInfo[1][0]) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1] !== dealerHandInfo[1][0])) { 
							dealer.bet(user.currentBet);					
						} else {
							dealer.call();
						}
					} else if (user.currentBet <= 300) {
						dealer.call();
					} else {
						dealer.fold();
					}
				} else if (dealerHandInfo[0] === 4) {
					if (communityOutsideStraightDraw === false) {
						if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {									
							if (dealerHandInfo[1].numValue > 7) {
								dealer.bet(user.currentBet);
							} else {
								dealer.bet(100 + randomInt);
							}					
						} else if (dealer.hand[0].numValue < 12 || dealer.hand[1].numValue < 12 ) {
							if (user.currentBet < 300) {
								dealer.call();
							} else {
								dealer.fold();
							}
						} else {
							dealer.fold();
						}
					} else if (user.currentBet <= 200) {
						dealer.call();
					} else {
						dealer.fold();
					}
				} else if (dealerHandInfo[0] === 3) {
					if (communityDraws) {
						if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
							if (user.currentBet <= 500) {
								dealer.bet(200 + randomInt);
							} else {
								dealer.call()
							} 	
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 7)) {
							dealer.call()
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {	
							if (user.currentBet <= 300) {
								dealer.call();
							} else {
								dealer.fold();
							}
						} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
							dealer.bet(200 + randomInt);	
						} else if (dealer.hand[0].value === "king" || dealer.hand[1].value === "king") {
							if (user.currentBet <= 200) {
								dealer.call();
							} else {
								dealer.fold();
							}
						} else {
							dealer.fold();
						}
					} else {
						dealer.fold();
					}
				} else if (dealerHandInfo[0] === 2) {
					if (communityDraws) {
						if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
							if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue)) {
								if (user.currentBet >= 1000) {
									if ((dealerHandInfo[1].numValue === dealer.hand[0].numValue && dealer.hand[1].numValue > 12) || (dealerHandInfo[1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 12)) {
										dealer.call();
									} else {
										dealer.fold();
									}
								} else {
									dealer.call()
								}
							} else if ((dealer.playStyle === "aggressive" && dealerHandInfo[1].numValue >= 10) || (straightDraw || flushDraw)) {
								if (user.currentBet <= 300) {
									dealer.call();
								} else {
									dealer.fold();
								}
							} else {
								dealer.fold();
							}
						} else {
							dealer.fold();
						}
					} else {
						if (user.currentBet < 1000) {
							dealer.bet(user.currentBet)
						} else if (user.currentBet < 5000) {
							dealer.call()
						} else {
							dealer.fold()
						}
					}
				} else {
					dealer.fold();
				}

			} else if (game.turn === "river" && user.currentBet === 0 && game.userTurn === "first") {
				
				var drawInfo = dealer.evalHand(draw);
				if (drawInfo.cards.contains(dealer.hand[1]) === false && drawInfo.cards.contains(dealer.hand[1]) === false) {
					if (drawInfo.drawType === "straight flush") {
						communityStraightFlushDraw = true;
					} else if (drawInfo.drawType === "straight and flush") {
						communinityStraightAndFlushDraw = true;
					} else if (drawInfo.drawType === "flush") {
						communityFlushDraw = true;
					} else if (drawInfo.drawType === "outside straight") {
						communityOutsideStraightDraw = true;
					} else if (drawInfo.drawType === "inside straight") {
						communityInsideStraightDraw;
					} else {
						console.log("some other draw");
					}
					communityDraws = true;
				}

				var dealerHandInfo = dealer.evalHand();

				if (dealerHandInfo[0] === 9) {
					if (dealerHandInfo[1].contains(dealer.hand[0]) || dealerHandInfo[1].contains(dealer.hand[1])) {
						dealer.bet(500 + randomInt);	
					} else {
						dealer.check();
					}
				} else if (dealerHandInfo[0] === 8) {
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
						dealer.bet(500 + randomInt);
					} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
						dealer.bet(500 + randomInt);
					} else {
						if (Math.floor(Math.random() * 4) === 1) {
							dealer.bet(500 + randomInt);
						} else {
							dealer.check();
						}
					}
				} else if (dealerHandInfo[0] === 7) {
					if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) && (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
						dealer.bet(600 + randomInt);
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
						dealer.bet(450 + randomInt);
					} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue, game.cards[4].numValue))) {
						dealer.bet(700 + randomInt);
					} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue > 10)) {
						dealer.bet(300 + randomInt);
					} else if (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) {
						dealer.bet(150 + randomInt);
					} else {
						dealer.check();
					}
				} else if (dealerHandInfo[0] === 6) {
					if (communityFlushDraw === false && communityStraightAndFlushDraw === false && (communityFlushDraw === false || (dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].value === "ace" || dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value === "ace"))) {
						dealer.bet(500 + randomInt);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].value === "ace")  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value === "ace")) {
						dealer.bet(500 + randomInt);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 10)  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value > 10)) {
						dealer.bet(400 + randomInt);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 5)  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value > 5)) {
						dealer.bet(300 + randomInt);
					} else if (dealerHandInfo[1].contains(dealer.hand[0]) || dealerHandInfo[1].contains(dealer.hand[1])) {
						dealer.bet(200 + randomInt);
					} else {
						dealer.check()
					}
				} else if (dealerHandInfo[0] === 5) {
					if (communityFlushDraw === false && communityStraightAndFlushDraw === false && communityStraightFlushDraw === false) {
						if ((dealerHandInfo[1].contains(dealer.hand[0]) === false) && (dealerHandInfo[1].contains(dealer.hand[1]) === false)) {
							if (Math.floor(Math.random() * 5) === 1) {
								dealer.bet(200 + randomInt);
							} else {
								dealer.check();
							}
						}
						else if (dealerHandInfo[1].contains(dealer.hand[0]) && dealerHandInfo[1].contains(dealer.hand[1])) {
							dealer.bet(400 + randomInt);
						} else if ((dealer.hand[0] === dealerHandInfo[1][4]) || (dealer.hand[1] === dealerHandInfo[1][4])) { 
							dealer.bet(350 + randomInt);					
						} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0] !== dealerHandInfo[1][0]) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1] !== dealerHandInfo[1][0])) { 
							dealer.bet(300 + randomInt);					
						} else if (dealer.hand[0] === dealerHandInfo[1][0] || dealer.hand[1] === dealerHandInfo[1][0]) {
							dealer.bet(200 + randomInt);
						}
					} else {
						dealer.bet(300 + randomInt);
					}
				} else if (dealerHandInfo[0] === 4) {
					if (communityDraws === false || dealer.playStyle === "aggressive") {
						if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {									
							if (dealerHandInfo[1].numValue > 11) {
								dealer.bet(400 + randomInt);
							} else if (dealerHandInfo[1].numValue > 7) {
								dealer.bet(400 + randomInt);
							} else {
								dealer.bet(300 + randomInt);
							}					
						} else if (dealer.hand[0].value === "ace" || dealer.hand[0].value === "ace") {
							dealer.bet(150 + randomInt);
						} else if (Math.floor(Math.random() * 4) === 1) {
							dealer.bet(300 + randomInt);
						} else {
							dealer.check();
						}
					} else {
						dealer.check()
					}
				} else if (dealerHandInfo[0] === 3) {
					if (communityDraws === false) {
						if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
							dealer.bet(500 + randomInt);
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) ) {
							dealer.bet(400 + randomInt);
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
							dealer.bet(300 + randomInt);	
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 7)) {
							dealer.bet(200 + randomInt);	
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
							dealer.bet(100 + randomInt);
						} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
							dealer.bet(100 + randomInt);
						} else if (Math.floor(Math.random() * 7) === 1) {
							dealer.bet(300 + randomInt);
						} else {
							dealer.check();
						}
					} else {
						if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
							dealer.bet(250 + randomInt);
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) ) {
							dealer.bet(200 + randomInt);
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
							dealer.bet(150 + randomInt);	
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 7)) {
							dealer.bet(100 + randomInt);	
						} else {
							dealer.check();
						}
					}
				} else if (dealerHandInfo[0] === 2) {
					if (communityDraws === false || (dealer.playStyle === "aggressive" && Math.floor(Math.random() * 2) === 0)) {
						if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
							if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue)) {
								dealer.bet(250 + randomInt);
							} else if (dealerHandInfo[1].numValue > 10) {
								dealer.bet(200 + randomInt);
							} else {
								dealer.bet(100 + randomInt);
							}
						} else if (dealer.hand[0].value === "ace" || dealer.hand[0].value === "ace") {
							if (Math.floor(Math.random() * 4) === 1) {
								dealer.bet(100 + randomInt);
							} else {
								dealer.check();
							}
						} else {
							if (Math.floor(Math.random() * 6) === 1) {
								dealer.bet(150 + randomInt);
							} else {
								dealer.check();
							}
						}
					} else {
						dealer.check();
					}
				} else {
					if (dealer.hand[0].value === "ace" || dealer.hand[0].value === "ace") {
						dealer.bet(150 + randomInt);
					} else if (Math.floor(Math.random() * 3) === 1) {
						dealer.bet(150 + randomInt);
					} else {
						dealer.check();
					}				
				}
			} else if (game.turn === "river" && user.currentBet === 0 && game.userTurn === "second") {

				var drawInfo = dealer.evalHand(draw);
				if (drawInfo.cards.contains(dealer.hand[1]) === false && drawInfo.cards.contains(dealer.hand[1]) === false) {
					if (drawInfo.drawType === "straight flush") {
						communityStraightFlushDraw = true;
					} else if (drawInfo.drawType === "straight and flush") {
						communinityStraightAndFlushDraw = true;
					} else if (drawInfo.drawType === "flush") {
						communityFlushDraw = true;
					} else if (drawInfo.drawType === "outside straight") {
						communityOutsideStraightDraw = true;
					} else if (drawInfo.drawType === "inside straight") {
						communityInsideStraightDraw;
					} else {
						console.log("some other draw");
					}
					communityDraws = true;
				}

			
				var dealerHandInfo = dealer.evalHand();
					
				if (dealerHandInfo[0] === 9) {
					if (dealerHandInfo[1].contains(dealer.hand[0]) || dealerHandInfo[1].contains(dealer.hand[1])) {
						dealer.bet(1000 + randomInt);	
					} else {
						dealer.check();
					}
				} else if (dealerHandInfo[0] === 8) {
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
						dealer.bet(950 + randomInt);
					} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
						dealer.bet(900 + randomInt);
					} else {
						dealer.check();
					}
				} else if (dealerHandInfo[0] === 7) {
					if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) && (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
						dealer.bet(800 + randomInt);
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
						dealer.bet(750 + randomInt);
					} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue, game.cards[4].numValue))) {
						dealer.bet(700 + randomInt);
					} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue > 10)) {
						dealer.bet(300 + randomInt);
					} else if (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) {
						dealer.bet(150 + randomInt);
					} else {
						dealer.check();
					}
				} else if (dealerHandInfo[0] === 6) {
					if (communityFlushDraw === false && communityStraightAndFlushDraw === false && (communityFlushDraw === false || (dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].value === "ace" || dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value === "ace"))) {
						dealer.bet(700 + randomInt);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].value === "ace")  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value === "ace")) {
						dealer.bet(800 + randomInt);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 10)  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value > 10)) {
						dealer.bet(600 + randomInt);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 6)  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value > 6)) {
						dealer.bet(400 + randomInt);
					} else if (dealerHandInfo[1].contains(dealer.hand[0]) || dealerHandInfo[1].contains(dealer.hand[1])) {
						dealer.bet(100 + randomInt);
					} else {
						dealer.check()
					}
				} else if (dealerHandInfo[0] === 5) {
					if (communityDraws === false) {
						if ((dealerHandInfo[1].contains(dealer.hand[0]) === false) && (dealerHandInfo[1].contains(dealer.hand[1]) === false)) {
							dealer.check();
						}
						if (dealerHandInfo[1].contains(dealer.hand[0]) && dealerHandInfo[1].contains(dealer.hand[1])) {
							dealer.bet(800 + randomInt);
						} else if ((dealer.hand[0] === dealerHandInfo[1][4]) || (dealer.hand[1] === dealerHandInfo[1][4])) { 
							dealer.bet(700 + randomInt);					
						} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0] !== dealerHandInfo[1][0]) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1] !== dealerHandInfo[1][0])) { 
							dealer.bet(650 + randomInt);					
						} else if (dealer.hand[0] === dealerHandInfo[1][0] || dealer.hand[1] === dealerHandInfo[1][0]) {
							dealer.bet(300 + randomInt);
						}
					} else if (dealer.playStyle === "aggressive") {
						dealer.bet(500 + randomInt);
					} else {
						dealer.check()
					}
				} else if (dealerHandInfo[0] === 4) {
					if (communityDraws === false) {
						if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {									
							if (dealerHandInfo[1].numValue > 11) {
								dealer.bet(550 + randomInt);
							} else if (dealerHandInfo[1].numValue > 7) {
								dealer.bet(480 + randomInt);
							} else {
								dealer.bet(400 + randomInt);
							}					
						} else {
							dealer.check();
						}
					} else {
						dealer.check();
					}
				} else if (dealerHandInfo[0] === 3) {
					if (communityDraws === false) {
						if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
							dealer.bet(500 + randomInt);
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue))) {
							dealer.bet(400 + randomInt);
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
							dealer.bet(300 + randomInt);	
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 7)) {
							dealer.bet(100 + randomInt);	
						} else {
							dealer.check();
						}
					} else {
						dealer.check();
					}
				} else if (dealerHandInfo[0] === 2) {
					if (communityDraws === false) {
						if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
							if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue)) {
								dealer.bet(150 + randomInt);
							} else if (dealerHandInfo[1].numValue > 10) {
								dealer.bet(100 + randomInt);
							} else {
								dealer.check();
							}
						} else {
							dealer.check();
						}
					} else {
						dealer.check();
					}
				} else {
					dealer.check();
				}
			} else if (game.turn === "river" && user.currentBet > 0) {
		
				var drawInfo = dealer.evalHand(draw);
				if (drawInfo.cards.contains(dealer.hand[1]) === false && drawInfo.cards.contains(dealer.hand[1]) === false) {
					if (drawInfo.drawType === "straight flush") {
						communityStraightFlushDraw = true;
					} else if (drawInfo.drawType === "straight and flush") {
						communinityStraightAndFlushDraw = true;
					} else if (drawInfo.drawType === "flush") {
						communityFlushDraw = true;
					} else if (drawInfo.drawType === "outside straight") {
						communityOutsideStraightDraw = true;
					} else if (drawInfo.drawType === "inside straight") {
						communityInsideStraightDraw;
					} else {
						console.log("some other draw");
					}
					communityDraws = true;
				}

				var dealerHandInfo = dealer.evalHand();
					
				if (dealerHandInfo[0] === 9) {
					if (dealerHandInfo[1].contains(dealer.hand[0]) || dealerHandInfo[1].contains(dealer.hand[1])) {
						dealer.bet(user.currentBet + (1000 + randomInt));	
					} else {
						if (dealer.playStyle === "aggressive") {
							dealer.call();
						} else {
							dealer.fold();
						}
					}
				} else if (dealerHandInfo[0] === 8) {
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
						dealer.bet(user.currentBet + (950 + randomInt));
					} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
						dealer.bet(900 + randomInt);
					} else {
						dealer.call();
					}
				} else if (dealerHandInfo[0] === 7) {
					if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) && (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
						dealer.bet(user.currentBet + (300 + randomInt));
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
						dealer.bet(user.currentBet + (200 + randomInt));
					} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue, game.cards[4].numValue))) {
						dealer.bet(user.currentBet + (100 + randomInt));
					} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue > 10)) {
						dealer.bet(300 + randomInt);
					} else if (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) {
						if (user.currentBet <= 1200) {
							dealer.call();
						} else {
							dealer.fold()
						}
					} else {
						if (user.currentBet <= 300) {
							dealer.call()
						} else {
							dealer.fold();
						}
					}

				} else if (dealerHandInfo[0] === 6) {
					if ((communityStraightAndFlushDraw === false && communityStraightFlushDraw === false) && (communityFlushDraw === false || (dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].value === "ace" || dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value === "ace"))) {
						dealer.bet(700 + randomInt);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].value === "ace")  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value === "ace")) {
						dealer.bet(500 + randomInt);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 10)  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value > 10)) {
						dealer.bet(400 + randomInt);
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 5)  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value > 5)) {
						if (user.currentBet <= 500) {
							dealer.call();
						} else {
							dealer.fold();
						}
					} else if (dealerHandInfo[1].contains(dealer.hand[0]) || dealerHandInfo[1].contains(dealer.hand[1])) {
						if (user.currentBet <= 300) {
							dealer.call();
						} else {
							dealer.fold();
						}
					} else {
						dealer.fold();
					}

				} else if (dealerHandInfo[0] === 5) { 
					if (communityStraighAndFlushDraw === false && communityStraightFlushDraw === false && communityFlushDraw === false) {
						if ((dealerHandInfo[1].contains(dealer.hand[0]) === false) && (dealerHandInfo[1].contains(dealer.hand[1]) === false)) {
							dealer.fold();
						}
						if (dealerHandInfo[1].contains(dealer.hand[0]) && dealerHandInfo[1].contains(dealer.hand[1])) {
							dealer.bet(800 + randomInt);
						} else if ((dealer.hand[0] === dealerHandInfo[1][4]) || (dealer.hand[1] === dealerHandInfo[1][4])) { 
							dealer.bet(700 + randomInt);					
						} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0] !== dealerHandInfo[1][0]) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1] !== dealerHandInfo[1][0])) { 
							dealer.bet(250 + randomInt);					
						} else if (dealer.hand[0] === dealerHandInfo[1][0] || dealer.hand[1] === dealerHandInfo[1][0]) {
							if (user.currentBet <= 1000) {
								dealer.call();
							} else {
								dealer.fold();
							}
						} else {
							dealer.fold();
						}
					} else {
						dealer.fold();
					}
				} else if (dealerHandInfo[0] === 4) {
					if (communityDraws === false) {
						if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {									
							if (dealerHandInfo[1].numValue > 11) {
								dealer.bet(550 + randomInt);
							} else if (dealerHandInfo[1].numValue > 7) {
								dealer.bet(400 + randomInt);
							} else {
								dealer.call();
							}					
						} else if ((user.currentBet <= 300) && dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
							dealer.call();
						} else {
							dealer.fold();
						}
					} else if ((dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) && (game.pot <= 300)) {
						dealer.call();
					} else {
						dealer.fold();
					}
				} else if (dealerHandInfo[0] === 3) {
					if (communityDraws === false) {
						if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
							if (user.currentBet <= 300 && game.pot <= 3000 ) {
								dealer.bet(300 + randomInt);
							} else {
								dealer.call();
							}
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue))) {
							if (user.currentBet <= 300 && game.pot <= 3000 ) {
								dealer.bet(200 + randomInt);
							} else {
								dealer.call();
							}
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
							if (user.currentBet <= 600) {
								dealer.call();
							} else {
								dealer.fold();
							}
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 7)) {
							if (user.currentBet <= 400) {
								dealer.call();
				 			} else {
				 				dealer.fold();
				 			}
						} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
							if (user.currentBet <= 200) {
								dealer.call();	
							} else {
								dealer.fold()
							}
						} else {
							dealer.fold();
						}
					} else {
						dealer.fold();
					}
				} else if (dealerHandInfo[0] === 2) {
					if (communityDraws === false) {
						if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
							if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue, game.cards[4].numValue)) {							
								if (user.currentBet <= 250) {
									dealer.bet(user.currentBet);
								} else if (user.currentBet <= 1000) {
									dealer.call();
								} else {
									dealer.fold();
								}							
							} else if ((dealerHandInfo[1].numValue > 9) && ((dealerHandInfo[1].numValue === dealer.hand[0].numValue && dealer.hand[1].numValue > Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue, game.cards[4].numValue)))) {
								if (user.currentBet <= 500) {
									dealer.call();
								} else {
									dealer.fold();
								}
							} else if (dealerHandInfo[1].numValue > 5) {
								if (user.currentBet <= 300) {
									dealer.call();
								} else {
									dealer.fold();
								}
							} else {
								dealer.fold();
							}
						} else {
							dealer.fold();
						}
					} else {
						dealer.fold();
					}
				} else {
					dealer.fold();
				}
			}
	}

	function getName () {
		userName = $("#name-input").val();
		
		$("#user h2").html(userName);

		$(".chip-stack").show();
		
		$("#name-form-container").css("visibility", "hidden");
		
		$(".cards, .players").css("visibility", "visible");
		
		$("#pot p").css("visibility", "hidden");
		$("#deck").html("<img src=images/cards/Mandolin_BACK.jpg>")

		user.playerName = userName;
		$("#user p").html("$" + user.bankroll);
 		genChips("#user-chips", user.bankroll);
 		$("#dealer p").html("$" + dealer.bankroll);
 		genChips("#dealer-chips", dealer.bankroll);
		$("#user-card1").css({"right": "0", "top": "0"}).addClass("dealt");
		var snd = new Audio("audio/cardSlide2.wav");
		snd.play();
	}

	function deal(times) {
		var cards = [];

		for (var i = 0; i < times; ++i) {
			var card = deck.shift();
			
			cards.push(card)
		}
		return cards
	}

	function endTurn() {
		
		if (dealer.bankroll !== 0 && user.bankroll !== 0) {
			$("#message").css("opacity", "0");
		}
		user.currentBet = 0;
		
		switch(game.turn) {
			case "preFlop":
			game.turn = "flop"
			user.currentBet = 0;
			dealer.currentBet = 0;
			setTimeout(function(){
				dealComCards(1);
			},300);
			$("#com-cards #card1").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
				dealComCards(2);
				$("#com-cards #card1").attr("src", game.cards[0].image);
			});
			$("#com-cards #card2").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
				dealComCards(3);
				$("#com-cards #card2").attr("src", game.cards[1].image);
			});
			$("#com-cards #card3").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
				
				$("#com-cards #card3").attr("src", game.cards[2].image);	
				$("#bet-options button").css("visibility", "visible");			
				$("#message").css("opacity", "0");
			
			
				$("#card1, #card2, #card3").css("visibility", "visible");
				if (user.bankroll === 0 || dealer.bankroll === 0) {
					endTurn();
				} else if (game.userTurn === "first") {
					$("#check, #bet").show();
					$("#call, #raise, #fold").hide();
				} else {
					dealerTurn();
				}
			});
			break;
				
			case "flop":

			game.turn = "turn"
			
			user.currentBet = 0;
			dealer.currentBet = 0;
			
			setTimeout(function(){
				dealComCards(4);
			},300);
			$("#com-cards #card4").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
	
				// $("#com-cards #card4").html("<img src=" + game.cards[3].image+">")
				$("#com-cards #card4").attr("src", game.cards[3].image);
				$("#card4").css("visibility", "visible");
				if (user.bankroll === 0 || dealer.bankroll === 0) {
					endTurn();
				} else if (game.userTurn === "first") {
					$("#check, #bet").show().css("visibility", "visible")
					$("#call, #raise, #fold").hide();
					
				} else {
					dealerTurn();
				}
			});
			
			
			break;

			case "turn":

			game.turn = "river"
			user.currentBet = 0;
			dealer.currentBet = 0;
			setTimeout(function(){
				dealComCards(5);
			},300);
			$("#com-cards #card5").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
				// $("#com-cards #card5").html("<img src=" + game.cards[4].image+">");
				$("#com-cards #card5").attr("src", game.cards[4].image);
				$("#card5").css("visibility", "visible");
				if (user.bankroll === 0 || dealer.bankroll === 0) {
					endTurn();
				} else if (game.userTurn === "first") {
					$("#check, #bet").show().css("visibility", "visible");
					
					$("#call, #raise, #fold").hide();
					
				} else {
					dealerTurn()
				}
			});
			
			break;

			case "river":

			user.currentBet = 0;
			dealer.currentBet = 0;
			var userHandInfo = user.evalHand(5)
			var dealerHandInfo = dealer.evalHand(5)
	
			// $("#dealer #card1").html("<img src=" + dealer.hand[0].image+">")
			// $("#dealer #card2").html("<img src=" + dealer.hand[1].image+">")
	
			var tie
			var userWins;
			var dealerWins;
			var userMessage = user.playerName + userHandInfo[2]
			var dealerMessage = dealer.playerName + dealerHandInfo[2]

			if (userHandInfo[0] > dealerHandInfo[0]) {
				userWins = true
				
			} else if (dealerHandInfo[0] > userHandInfo[0]) {
				dealerWins = true
				
			} else if (userHandInfo[0] === 6 && dealerHandInfo[0] === 6) {
				for (var i = 0; i < 5; ++i) {
					if (userHandInfo[1][i].numValue > dealerHandInfo[1][i].numValue) {
						userWins = true;
						break;
					} else if (dealerHandInfo[1][i].numValue > userHandInfo[1][i].numValue) {
						dealerWins = true;
						break;
					} 
				}
				tie = true;	
			} else if (userHandInfo[0] === 5 && dealerHandInfo[0] === 5) {
				if (userHandInfo[1][4].numValue > dealerHandInfo[1][4].numValue) {
					userWins = true;
				} else if (userHandInfo[1][4].numValue < dealerHandInfo[1][4].numValue) {
					dealerWins = true;
				} else {
					tie = true;
				}
			} else if ((userHandInfo[0] === 3 && dealerHandInfo[0] === 3) || (userHandInfo[0] === 7 && dealerHandInfo[0] === 7)) {
				if (userHandInfo[1][0].numValue > dealerHandInfo[1][0].numValue) {
					userWins = true
				} else if (dealerHandInfo[1][0].numValue > userHandInfo[1][0].numValue) {
					dealerWins = true
					
				} else if (userHandInfo[1][1].numValue > dealerHandInfo[1][1].numValue) {
					userWins = true
					
				} else if (dealerHandInfo[1][1].numValue > userHandInfo[1][1].numValue) {
					dealerWins = true

				} else if ((userHandInfo[1][0].numValue === dealerHandInfo[1][0].numValue) && (userHandInfo[1][1].numValue === dealerHandInfo[1][1].numValue)) {
					if (userHandInfo[0] === 7 && dealerHandInfo[0] === 7) {
						tie = true;
					} else if (userHandInfo[3][0].numValue > dealerHandInfo[3][0].numValue) {
						userWins = true;
						userMessage += " with a " + userHandInfo[3][0].value + " kicker";						
					} else if (dealerHandInfo[3][0].numValue > userHandInfo[3][0].numValue) {
						dealerWins = true;
						dealerMessage += " with a " + dealerHandInfo[3][0].value + " kicker";						
					} else {
						tie = true;
					}
				}				
			} else if (userHandInfo[1].numValue > dealerHandInfo[1].numValue) {
				userWins = true

			} else if (dealerHandInfo[1].numValue > userHandInfo[1].numValue) {
				dealerWins = true;
				
			} else if (dealerHandInfo[1].numValue === userHandInfo[1].numValue) {
				
				for (var i = 0; i < dealerHandInfo[3].length; ++i) {
					if (userHandInfo[3][i].numValue > dealerHandInfo[3][i].numValue) {
						userWins = true;
						userMessage += " with a " + userHandInfo[3][i].value + " kicker";
						break;
						
					}
					else if (dealerHandInfo[3][i].numValue > userHandInfo[3][i].numValue) {
						dealerWins = true;
						dealerMessage += " with a " + dealerHandInfo[3][i].value + " kicker";
						break;		
					} 
				}

			} else {
				tie = true;
			}
			
			$("#bet-options *").css("visibility", "hidden");
			if (userWins === true) {
				$("#message").html(dealerMessage + "<br>" + userMessage + "<br>" + user.playerName + " wins $" + game.pot);
	
				setTimeout(function(){
					// $("#pot-chips").addClass("add-pot");
					$("#pot-chips img").addClass("add-pot");
					$("#pot-chips img").css("bottom", "-355px");
				},500);
				user.bankroll += game.pot;
			} else if (dealerWins === true) {
				$("#message").css("visibility", "visible");
				$("#message").html(userMessage + "<br>" + dealerMessage + "<br>" + dealer.playerName + " wins $" + game.pot);
				setTimeout(function(){
					// $("#pot-chips").css("transition", "bottom .4s linear");
					$("#pot-chips img").addClass("add-pot");
					$("#pot-chips img").css("bottom", "220px");
				},300);
				dealer.bankroll += game.pot;
			} else {
				$("#message").html(dealerMessage + "<br>" + userMessage + "<br>" + " split pot" );
				user.bankroll += (game.pot/2);
				dealer.bankroll += (game.pot/2);
				genChips("#pot-chips", game.pot/2);
				genChips("#pot-chips2", game.pot/2);
				$("#pot-chips2").css("visibility","visible");
				setTimeout(function(){
					// $("#pot-chips").css("transition", "bottom .6s linear");
					$("#pot-chips img").addClass("add-pot").css("bottom", "-498px");
					// $("#pot-chips2").css("transition", "bottom .4s linear");
					$("#pot-chips2 img").addClass("add-pot").css("bottom", "249px");
				},300);
			}	
			
			if (user.bankroll === 0) {
				$("#message").html(userMessage + "<br>" + dealerMessage + "<br>" + dealer.playerName + " wins $" + game.pot + "<br>" + "You Lose");
				$("#play-again-container").css("visibility", "visible");
				$("#next-hand").hide();
				setTimeout(function () {
					updateLeaderBoard(user.playerName, user.consecWins)
					user.consecWins = 0;	
				}, 2000);
			} else if (dealer.bankroll === 0) {
				user.consecWins++
				$("#message").html(dealerMessage + "<br>" + userMessage + "<br>" + user.playerName + " wins $" + game.pot + "<br>" + "You Win");				
				$("#play-again-container").css("visibility", "visible");
				$("#yes").text("Next Match?").show();
				$("#no").text("No Thanks").show();	
			}

			// If five hands have been dealt, calculate how many times the player has been dealt and asign the dealer the appropriate play style
			if (user.betHistory.betsPerHand.length === 5) {
				user.betHistory.betsPerHand.splice(0,0)
				user.betHistory.betsPerHand.push(user.betHistory.betsThisHand);
			} else {
				user.betHistory.betsPerHand.push(user.betHistory.betsThisHand);
			}
			user.betHistory.betsThisHand = 0;
			// 
			if (user.betHistory.betPreFlop === "true") {
				user.betHistory.consecutivePreFlopBets++;
			} else {
				user.betHistory.consecutivePreFlopBets = 0;
			}
			user.betHistory.totalBetsInFiveHands = user.betHistory.betsPerHand.reduce(function(a, b) {
				return a + b;
			});
			user.betPreFlop = "false";
			user.betFlop = "false";
			user.betTurn =  "false";
			user.betRiver = "false";			
			
			if (user.betHistory.totalBetsInFiveHands > 6) {
				dealer.playStyle = "aggressive"
			} else {
				dealer.playStyle = "normal"
			}

			$("#dealer-card1").attr("src", dealer.hand[0].image)
			$("#dealer-card2").attr("src", dealer.hand[1].image)
			
			$("#pot p").css("visibility","hidden");
			
			$("#message").css({"opacity": "1", "visibility": "visible"});
			
			$("#bet-options *").css("visibility", "hidden");
		
					
		}
	}


	function createDeck() {
			
		function Card(value, numValue, suit, image) {
			this.value = value;
			this.numValue = numValue;
			this.suit = suit;
			this.image = image;

			deck.push(this);
		}

		var aSpades = new Card("ace", 14, "spade", "images/cards/ace_of_spades.png");
		var aClubs = new Card("ace", 14, "club", "images/cards/ace_of_clubs.png");
		var aHearts = new Card("ace", 14, "heart", "images/cards/ace_of_hearts.png");
		var aDiamonds = new Card("ace", 14, "diamond", "images/cards/ace_of_diamonds.png");
		var twoSpades = new Card("two", 2, "spade", "images/cards/2_of_spades.png");
		var twoClubs = new Card("two", 2, "club", "images/cards/2_of_clubs.png");
		var twoHearts = new Card("two", 2, "heart", "images/cards/2_of_hearts.png");
		var twoDiamonds = new Card("two", 2, "diamond", "images/cards/2_of_diamonds.png");
		var threeSpades = new Card("three", 3, "spade", "images/cards/3_of_spades.png");
		var threeClubs = new Card("three", 3, "club", "images/cards/3_of_clubs.png");
		var threeHearts = new Card("three", 3, "heart", "images/cards/3_of_hearts.png");
		var threeDiamonds = new Card("three", 3, "diamond", "images/cards/3_of_diamonds.png");
		var fourSpades = new Card("four", 4, "spade", "images/cards/4_of_spades.png");
		var fourClubs = new Card("four", 4, "club", "images/cards/4_of_clubs.png");
		var fourHearts = new Card("four", 4, "heart", "images/cards/4_of_hearts.png");
		var fourDiamonds = new Card("four", 4, "diamond", "images/cards/4_of_diamonds.png");
		var fiveSpades = new Card("five", 5, "spade", "images/cards/5_of_spades.png");
		var fiveClubs = new Card("five", 5, "club", "images/cards/5_of_clubs.png");
		var fiveHearts = new Card("five", 5, "heart", "images/cards/5_of_hearts.png");
		var fiveDiamonds = new Card("five", 5, "diamond", "images/cards/5_of_diamonds.png");  
		var sixSpades = new Card("six", 6, "spade", "images/cards/6_of_spades.png");
		var sixClubs = new Card("six", 6, "club", "images/cards/6_of_clubs.png");
		var sixHearts = new Card("six" , 6, "heart", "images/cards/6_of_hearts.png");
		var sixDiamonds = new Card("six", 6, "diamond", "images/cards/6_of_diamonds.png");
		var sevenSpades = new Card("seven", 7, "spade", "images/cards/7_of_spades.png");
		var sevenClubs = new Card("seven", 7, "club", "images/cards/7_of_clubs.png");
		var sevenHearts = new Card("seven", 7, "heart", "images/cards/7_of_hearts.png");
		var sevenDiamonds = new Card("seven", 7, "diamond", "images/cards/7_of_diamonds.png");
		var eightSpades = new Card("eight", 8, "spade", "images/cards/8_of_spades.png");
		var eightClubs = new Card("eight", 8, "club", "images/cards/8_of_clubs.png");
		var eightHearts = new Card("eight", 8, "heart", "images/cards/8_of_hearts.png");
		var eightDiamonds = new Card("eight", 8, "diamond", "images/cards/8_of_diamonds.png");
		var nineSpades = new Card("nine", 9, "spade", "images/cards/9_of_spades.png");
		var nineClubs = new Card("nine", 9, "club", "images/cards/9_of_clubs.png");
		var nineHearts = new Card("nine", 9, "heart", "images/cards/9_of_hearts.png");
		var nineDiamonds = new Card("nine", 9, "diamond", "images/cards/9_of_diamonds.png");
		var tenSpades = new Card("ten", 10, "spade", "images/cards/10_of_spades.png");
		var tenClubs = new Card("ten", 10, "club", "images/cards/10_of_clubs.png");
		var tenHearts = new Card("ten", 10, "heart", "images/cards/10_of_hearts.png");
		var tenDiamonds = new Card("ten", 10, "diamond", "images/cards/10_of_diamonds.png");
		var jackSpades = new Card("jack", 11, "spade", "images/cards/jack_of_spades2.png");
		var jackClubs = new Card("jack", 11, "club", "images/cards/jack_of_clubs2.png");
		var jackHearts = new Card("jack", 11, "heart", "images/cards/jack_of_hearts2.png");
		var jackDiamonds = new Card("jack", 11, "diamond", "images/cards/jack_of_diamonds2.png");
		var queenSpades = new Card("queen", 12, "spade", "images/cards/queen_of_spades2.png");
		var queenClubs = new Card("queen", 12, "club", "images/cards/queen_of_clubs2.png");
		var queenHearts = new Card("queen", 12, "heart", "images/cards/queen_of_hearts2.png");
		var queenDiamonds = new Card("queen", 12, "diamond", "images/cards/queen_of_diamonds2.png");
		var kingSpades = new Card("king", 13, "spade", "images/cards/king_of_spades2.png");
		var kingClubs = new Card("king", 13, "club", "images/cards/king_of_clubs2.png");
		var kingHearts = new Card("king", 13, "heart", "images/cards/king_of_hearts2.png");
		var kingDiamonds = new Card("king", 13, "diamond", "images/cards/king_of_diamonds2.png");
	}

	function genChips(stack, amount) {

		$(stack + " img").remove();

		var chipType = [0, 0, 0, 0, 0, 0]

		var chipStack = 0;
		while (chipStack !== amount) {
			if (chipStack + 1000 <= amount) {
				chipStack += 1000;
				chipType[0] += 1;
			} else if (chipStack + 500 <= amount) {
				chipStack += 500;
				chipType[1] += 1;
			} else if (chipStack + 100 <= amount) {
				chipStack += 100;
				chipType[2] += 1;	
			} else if (chipStack + 20 <= amount) {
				chipStack += 20;
				chipType[3] += 1;
			} else if (chipStack + 5 <= amount) {
				chipStack += 5;
				chipType[4] += 1;
			} else if (chipStack + 1 <= amount) {
				chipStack += 1;
				chipType[5] += 1;
			}		
		}

		// break large chips into smaller chips
		if (amount >= 2000){
			// for every 2000 dollars...
			for (var i = 1; i <= chipType[0]/2; ++i) {
				chipType[0] -= 2;
				chipType[1] += 3;
				chipType[2] += 4;
				chipType[3] += 4;
				chipType[4] += 4;
			}
		} else if (amount >= 1000) {
			chipType[0] -= 1;
			chipType[1] += 1;
			chipType[2] += 4;
			chipType[3] += 4;
			chipType[4] += 4;
		} 

		// if (chipType[0] <= 5 && chipType[2] >= 13 && chipType[3] >= 13 && chipType[4] >= 13) {
		// 	chipType[0] += 1;
		// 	chipType[2] -= 8;
		// 	chipType[3] -= 8;
		// 	chipType[4] -= 8;
		// }

		for (var i = 0; i < 6; ++i) {
			if (chipType[i] === 0) {
				$(stack + " div:nth-child(" + (i + 1) + ")").hide();
			} else {
				for (var j = 1; j <= chipType[i]; j++) {
					$(stack + " div:nth-child(" + (i + 1) + ")").css("display", "inline-block");
					if (i === 0) {
						$(stack + " .k-stack").append("<img id=k-chip" + j + " class=k-chip-image>");
						$(stack + " #k-chip" + j).css("bottom", j * 3 + "px").attr("src", "http://community.roll20.net/uploads//FileUpload/49/48ecbe08c8fdc8172ff1b930b29d7a.gif");
					} else if (i === 1) {
						$(stack + " .fh-stack").append("<img id=fh-chip" + j + " class=fh-chip-image>");
						$(stack + " #fh-chip" + j).css("bottom", j * 3 + "px").attr("src", "http://community.roll20.net/uploads//FileUpload/75/f5a64660631f20d328f6e541ac5f02.gif");
					} else if (i === 2) {
						$(stack + " .h-stack").append("<img id=h-chip" + j + " class=h-chip-image>");
						$(stack + " #h-chip" + j).css("bottom", j * 3 + "px").attr("src", "http://community.roll20.net/uploads//FileUpload/d7/e9c5295907db22318d8be6bc5edcad.gif");
					} else if (i === 3) {
						$(stack + " .tw-stack").append("<img id=tw-chip" + j + " class=tw-chip-image>");
						$(stack + " #tw-chip" + j).css("bottom", j * 3 + "px").attr("src", "http://community.roll20.net/uploads//FileUpload/80/f20722accf48f4fd9be89bfebf53e4.gif");
					} else if (i === 4) {
						$(stack + " .f-stack").append("<img id=f-chip" + j + " class=f-chip-image>");
						$(stack + " #f-chip" + j).css("bottom", j * 3 + "px").attr("src", "http://community.roll20.net/uploads//FileUpload/44/f2405cf50bf08240393e660c6b25cf.gif");
					} else if (i === 5) {
						$(stack + " .o-stack").append("<img id=o-chip" + j + " class=o-chip-image>");
						$(stack + " #o-chip" + j).css("bottom", j * 3 + "px").attr("src", "http://community.roll20.net/uploads//FileUpload/0f/d9eca82950e8b4b786d6a864aa0a4a.gif");
					}
					
				}
			}
		}


	}

	var arbitraryNumber = 0;
	$("#user-card1").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		var snd = new Audio("audio/cardSlide2.wav");
		snd.play();
		$("#user-card1").attr("src", user.hand[1].image)
		
		if (game.userTurn === "first") {
			$("#dealer-card1").css({"right": "0", "top": "0"}).addClass("dealt");
			
		} else {
			$("#dealer-card2").css({"right": "0", "top": "0"}).addClass("dealt");
		}
		
	});
	$("#dealer-card1").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		var snd = new Audio("audio/cardSlide2.wav");
		snd.play();
		if (game.userTurn === "first") {
			$("#user-card2").css({"right": "0", "top": "0"}).addClass("dealt");
		} else {
			$("#user-card1").css({"right": "0", "top": "0"}).addClass("dealt");
		}
	});
	$("#user-card2").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		
		$("#user-card2").attr("src", user.hand[0].image)
		if (game.userTurn === "first") {
			$("#dealer-card2").css({"right": "0", "top": "0"}).addClass("dealt");
			var snd = new Audio("audio/cardSlide2.wav");
			snd.play();
			
		} else {
			++arbitraryNumber
			gameInit(arbitraryNumber);
		}
	});
	$("#dealer-card2").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		if (game.userTurn === "first") {
			++arbitraryNumber
			gameInit(arbitraryNumber);					
		} else {
			$("#user-card2").css({"right": "0", "top": "0"}).addClass("dealt");	
			var snd = new Audio("audio/cardSlide2.wav");
			snd.play();	
		}
	});

	$("#user-bet-chips").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		
		var snd = new Audio("audio/chipsStack4.wav");
		snd.play();	
		$("#user-bet-chips img, #dealer-bet-chips img").remove();
		$("#pot p").addClass("add-funds-to-pot");

		// $("#user-bet-chips, #dealer-bet-chips").remove();
		
		$("#pot p").html("pot: $" + game.pot).val();
		genChips("#pot-chips", game.pot);				
		$("#message").css("visibility", "hidden");

		// $("#user-chips").before("<div id=user-bet-chips class=chip-stack>");
		// $("#dealer").append("<div id=dealer-bet-chips class=chip-stack>"); 	    
		setTimeout(function(){
			$("#user-bet-chips").removeClass("add-pot");
			$("#user-bet-chips").css("bottom", "260px");
			$("#dealer-bet-chips").removeClass("add-pot");
			$("#dealer-bet-chips").css("bottom", "-35px");
		},100)	

		if (user.bankroll === 0 && user.currentBet === 0) {
			$("#message").html("all in").addClass("fade");
			$("#bet-options *").hide();
			return;
		}

		if (game.turn === "preFlop" && game.pot === 1000) {
				
    		if (game.userTurn === "first") {
    			
				// dealerTurn()
   				// return
    			
    		} else {
    			$("#check, #bet").show();
    			return;
    		}
    	} else if (this.playerName !== "dealer") {						
			endTurn();
		} else {
			$("#message").delay(800).addClass("fade");
		}

	});

	$("#dealer-bet-chips").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		if (game.turn === "preFlop" && game.pot === 1000) {
			var snd = new Audio("audio/chipsStack4.wav");
			$("#pot p").addClass("add-funds-to-pot");
			snd.play();	
			$("#pot p").html("pot: $" + game.pot).val();
			genChips("#pot-chips", game.pot);
			$("#dealer-bet-chips").removeClass("add-pot");
			$("#dealer-bet-chips").css("bottom", "0");
			$("#dealer-bet-chips img").remove();
		}
	});

	$("#pot-chips").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		
		if ($("#pot-chips img").css("bottom") === "220px") {
			genChips("#dealer-chips", dealer.bankroll);
			$("#dealer p").html("$" + dealer.bankroll).addClass("add-funds");
			src = new Audio("audio/chipsStack6.wav")
			src.play();
		} else if ($("#pot-chips img").css("bottom") === "-355px") {
			genChips("#user-chips", user.bankroll);
			$("#user p").html("$" + user.bankroll).addClass("add-funds");
			src = new Audio("audio/chipsStack3.wav")
			src.play();
		}
			
		$("#pot-chips img").remove();

		$("#user-bet-chips").css("visibility","hidden");

		if (dealer.bankroll !== 0 && user.bankroll !== 0) {
			setTimeout(function(){
				$("#play-again-container").css("visibility","visible");
				$("#next-hand").show();
				$("#user-bet-chips").hide();
			},800)
		} else {
			user.bankroll = 10000;
			dealer.bankroll = 10000;
		}
	});

	$("#pot-chips2").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		
		src = new Audio("audio/chipsStack3.wav")
		src.play();
		genChips("#dealer-chips", dealer.bankroll);
		$("#dealer p").html("$" + dealer.bankroll).addClass("add-funds");
		$("#pot-chips2 img").remove();
	});
});
