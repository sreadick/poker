$(document).on("ready", function() {

// TODO: //
// animate pot pulse
// create sound effects
// implement pauses with sleep, transitionend, etc
// improve dealer AI
// fix all in
// make responsive
// improve layout


	$(".cards, .players, #bet-form, #message, #pot").css("visibility", "hidden");
	
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
		}
	})
	$("#name-submit").on("click", function(){
		if ($("#name-input").val().length > 0) {			
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
		$("#user-bet-chips").hide();
		
	});
	$("#call").on("click", function() {
		$("#bet-form *").css("visibility", "hidden");
		$("#call, #raise, #fold").hide();
		$("#bet-options button").css("visibility","hidden");
		user.call()	
	});
	$("#raise").on("click", function() {
		$("#bet-form *").css("visibility", "visible");
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
		}
	});
	$("#next-hand").on("click", function() {
		$("#user-bet-chips").css("visibility","visible");
		$("#user-card1, #user-card2, #dealer-card1, #dealer-card2").removeClass("dealt");
		$("#next-hand").css("visibility", "hidden");
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

		// $("#user-card1, #user-card2, #dealer-card1, #dealer-card2").remove();
		// $("#user .cards").append("<img id=user-card1>", "<img id=user-card2>");
		// $("#dealer .cards").append("<img id=dealer-card1>", "<img id=dealer-card2>");
		
		
		$("#user-card1").css({"right": "178.5px", "bottom": "349px"});
		$("#user-card2").css({"right": "271px", "bottom": "349px"});	
		$("#dealer-card1").css({"right": "178px", "top": "250px"});
		$("#dealer-card2").css({"right": "271px", "top": "250px"});

		if (game.userTurn === "first") {
			game.userTurn = "second";
		} else {
			game.userTurn = "first";			
		}				
		
		$("#bet-options *").css("visibility", "hidden");
		$("#bet-options *").show();
		$("#bet-form *").css("visibility", "hidden");
		// $("#user-card1").addClass("dealt"); ???????????????????????????????????????????????????????
		var allInBlind = false;	
		if (user.bankroll > 250 && dealer.bankroll > 250) {
			user.bankroll -= 250;
    		dealer.bankroll -= 250;
    	} else {
    		allInBlind = true;
    	}

    	newGame(game.userTurn, allInBlind);

  //   	$("#user-card1").addClass("dealt");
  //   	$("#pot").css("visibility", "hidden");
  //   	if (game.userTurn === "first") {
    		
  //   		$("#user-card1").addClass("dealt");
		// 	$("#user-card1").css({"right": "0", "bottom": "0"}); 
  //   	} else {
  //   		$("#dealer-card1").addClass("dealt");
		// 	$("#dealer-card1").css({"right": "0", "top": "0"}); 
		// }


    	$("#pot p").css("visibility", "hidden");
    	if (game.userTurn === "first") {
    		setTimeout(function(){
    			$("#user-card1").addClass("dealt");
    			$("#user-card1").css({"right": "0", "bottom": "0"});
    		}, 100)
    	} else {
    		setTimeout(function(){
    			$("#dealer-card1").addClass("dealt");
    			$("#dealer-card1").css({"right": "0", "top": "0"}); 
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
				$("#next-hand").css("visibility", "visible");
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
	newGame(userTurn, allInBlind)
	function newGame(userTurn, allInBlind) {
		deck.length = 0;
		createDeck()
		
		shuffle();
		user.hand = deal(2);
		dealer.hand = deal(2);
		game = new Game(userTurn, allInBlind);
	}

	function Game(userTurn, allInBlind) {
		this.userTurn = userTurn;
		this.cards = [];
		this.turn = "preFlop";		

		$("#user-card1, #user-card2, #dealer-card1, #dealer-card2").attr("src", "http://buvesz.blog.hu/media/image/Mandolin_BACK.jpg");
		
		if (allInBlind === false) {
			this.pot = 500;
		} else if (user.bankroll <= 250) {
			$("#next-hand").css("visibility", "hidden");
			this.pot = user.bankroll * 2;
			dealer.bankroll -= user.bankroll;
			user.bankroll -= user.bankroll;
			$("#bet-options *").css("visibility", "hidden");
			$("#pot p").html("pot: $" + this.pot).css("visibility", "visible");
			genChips("#pot-chips", game.pot);
			$("#message").html("All in").css({"visibility": "visible", "opacity": "1"});
		} else if (dealer.bankroll <= 250) {
			$("#next-hand").css("visibility", "hidden");
			this.pot = dealer.bankroll * 2;
			user.bankroll -= dealer.bankroll;
			dealer.bankroll -= dealer.bankroll;
			$("#bet-options *").css("visibility", "hidden");
			$("#pot p").html("pot: $" + this.pot).css("visibility", "visible");
			genChips("#pot-chips", game.pot);
			$("#message").html("Dealer is all in").css("opacity", "1");
		} else {
			alert()
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
		
		this.check = function() {

			if (this.playerName !== "dealer") {
				if (game.userTurn === "first") {						
					dealerTurn();
					$("#message").css("opacity", "1")
				} else {
					endTurn()
				}
				
    			$("#bet-form").css("visibility", "hidden");
			} else {
				if (game.turn === "preFlop" && game.pot === 1000) {
					// $("#user-bet-chips").css("transition", "bottom .4s linear");
	 				$("#user-bet-chips").addClass("add-pot").css("bottom", "550px");
				}
				if (game.userTurn === "first") {
					$("#message").html("dealer checks").css("visibility", "visible").delay(800).addClass("fade");
					// redu
				} else {
					$("#message").html("dealer checks").css({"visibility": "visible", "opacity": "1"});
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
    			// $("#pot p").html("pot: $" + game.pot).val();
    			// genChips("#pot-chips", game.pot);
    			$("#bet-form").css("visibility", "hidden");

    				dealerTurn();

			} else {
				var action;
				var dealerAllIn;
				var userAllIn;
				
				if (user.currentBet === 0) {
					action = "bets";
				} else {
					action = "raises";
				}

				if (user.currentBet >= dealer.bankroll) {
					dealer.call();
					return;
				}				
				if (betAmount + user.currentBet >= dealer.bankroll) {
					betAmount = dealer.bankroll - user.currentBet;
					dealerAllIn = true;
				} else if (betAmount >= user.bankroll) {
					betAmount = user.bankroll;
					userAllIn = true;
				}
				
				this.currentBet = betAmount;
				game.pot += betAmount + user.currentBet;
				this.bankroll -= betAmount + user.currentBet;
				$("#dealer p").html("$" + this.bankroll);
 				genChips("#dealer-chips", this.bankroll);
				
				$("#pot p").css("visibility", "visible");
    			if (dealerAllIn === true) {
    				$("#message").html("Dealer is all in <br> ($" + betAmount + ")");
    				$("#check, #bet, #raise").hide();
    				$("#call, #fold").show();
    				genChips("#dealer-bet-chips", betAmount + user.currentBet);
    			} else if (userAllIn === true && smallBlind === true) {
    				$("#message").html("Call small blind? ($" + betAmount + ")");
    				$("#check, #bet, #raise").hide();
					$("#call, #fold").show();
    			} else if (smallBlind === true) {
    				$("#message").html("Call small blind? ($" + betAmount + ")");
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
		}

		this.call = function() {

			if (this.playerName != "dealer") {
				$("#message").html("");
				this.bankroll -= dealer.currentBet;
				game.pot += dealer.currentBet;
				$("#user p").html("$" + this.bankroll);
 				genChips("#user-chips", this.bankroll);		
				
				genChips("#user-bet-chips", dealer.currentBet);

				if (game.pot !== 1000) {
					// setTimeout(function(){
	    				// $("#user-bet-chips").css("transition", "bottom .4s linear");
	    				$("#dealer-bet-chips").addClass("add-pot").css("bottom", "-150px");
	 					$("#user-bet-chips").addClass("add-pot").css("bottom", "550px");
	    				// $("#dealer-bet-chips").css("transition", "bottom .4s linear");
	 					
	    			// }, 100)
				} else {
					dealerTurn();
				}
				
 				

 				// $("#pot p").html("pot: $" + game.pot).val();
				// genChips("#pot-chips", game.pot);				
				// $("#message").css("visibility", "hidden");				
   				// $("#bet-form").css("visibility", "hidden");
    	// 			if (user.bankroll === 0) {
				// 	$("#message").html("all in").addClass("fade");
				// 	$("#bet-options *").hide();
				// 	return;
				// }
    			
			} else {

				this.bankroll -= user.currentBet;
				game.pot += user.currentBet;
				
				$("#dealer p").html("$" + this.bankroll);
 				genChips("#dealer-chips", this.bankroll);
				// $("#pot p").html("pot: $" + game.pot).val();
				// genChips("#pot-chips", game.pot);
				
				if (game.userTurn === "second" || game.pot === 1000) {
	    			$("#message").html("dealer calls small blind").css({"visibility": "visible", "opacity": "1"});
    			} else {
					$("#message").html("dealer calls " + "$" + user.currentBet).css({"visibility": "visible", "opacity": "1"}); 			
				} 
				genChips("#dealer-bet-chips", user.currentBet);
				$("#bet-options button").hide();
				setTimeout(function(){
					if (game.userTurn === "first" || game.pot !== 1000) {
	    				$("#user-bet-chips").addClass("add-pot");
	 					$("#user-bet-chips").css("bottom", "550px");
    				} 
 					$("#dealer-bet-chips").addClass("add-pot");
 					$("#dealer-bet-chips").css("bottom", "-150px");
    			}, 100)

				if (game.turn === "river") {
					$("#message").removeClass("fade")
					$("#message").addClass("fade");
				}
				if (dealer.bankroll === 0) {
					$("#message").html("dealer is all in");
					endTurn();
					$("#bet-options *").hide();
					return;
				}
			}

			
			// if (game.turn === "preFlop" && game.pot === 1000) {
   //  			if (game.userTurn === "first") {
   //  				dealerTurn();
   //  				return
   //  			} else {
   //  				$("#check, #bet").show();
   //  				return;
   //  			}
   //  		} else if (this.playerName !== "dealer") {						
			
			// 	endTurn(); 
			// } else {
		
			// 	$("#message").delay(800).addClass("fade");
			// 	$("#check, #bet").show();
			// 	$("#bet-options button").hide()
			// }

		}

		this.fold = function () {
			$("#user-bet-chips img, #dealer-bet-chips img").remove();
			if (this.playerName != "dealer") {
				dealer.bankroll += game.pot;
				// $("#dealer p").html("$" + dealer.bankroll);
 			// 	genChips("#dealer-chips", dealer.bankroll);
				$("#message").html("dealer wins $" + game.pot);
    			$("#bet-form").css("visibility", "hidden");
    			setTimeout(function(){
    				// $("#pot-chips").css("transition", "bottom .4s linear");
					$("#pot-chips img").addClass("add-pot");
					$("#pot-chips img").css("bottom", "249px");
				},300);
			} else {
				user.bankroll += game.pot;
				// $("#user p").html("$" + user.bankroll);
				// genChips("#user-chips", user.bankroll);	
				$("#message").html("dealer folds: " + user.playerName + " wins $" + game.pot);
				setTimeout(function(){
					// $("#pot-chips").css("transition", "bottom .6s linear");
					$("#pot-chips img").addClass("add-pot");
					$("#pot-chips img").css("bottom", "-498px");	
				},300);
			}

			$("#dealer #card1").html("<img src=" + dealer.hand[0].image+">");
			$("#dealer #card2").html("<img src=" + dealer.hand[1].image+">");
			
			$("#message").css({"visibility": "visible", "opacity": "1"});	
		
			$("#bet-options *").css("visibility", "hidden");						
			$("#pot p").css("visibility", "hidden");
			return;
		}

		this.evalHand = function(numCards) {

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
			var flushSuit;
			var flush = checkFlush(totalCards, numCards)
			function checkFlush(cards, targetLength) {
				var topFlush;
				hasFlush = false;
				for (var i = 0; i < cards.length; ++i) {
					var currentFlush = [cards[i]];
					
					for (var j = i+1;  j < cards.length; ++j) {
						if (cardSuits[i] === cardSuits[j]) {
							
							if (currentFlush.length <= targetLength - 1) {
								currentFlush.push(cards[j])
								
							} else {
								
								var flushNumbers = [];
								for (var x = 0; x < currentFlush.length; ++x) {
									flushNumbers.push(currentFlush[x].numValue)
								}

								if (cards[j].numValue > (Math.min(flushNumbers))) {

									var index = flushNumbers.indexOf(Math.min(flushNumbers))
									currentFlush.splice(index, 1)	
									currentFlush.push(cards[j])
								}

							} 
							if (currentFlush.length === targetLength) {
								flushSuit = cardSuits[i]
								hasFlush = true;
								topFlush = currentFlush
							}
						}
					}
					if (hasFlush === true) {
					var topOrderedFlush = [];
					var flushNumbers = [];			
					for (var x = 0; x < topFlush.length; ++x) {
						flushNumbers.push(topFlush[x].numValue);
					}
					for (var i = 0; i < targetLength; ++i)  {
						var index = flushNumbers.indexOf(Math.max(...flushNumbers))
						topOrderedFlush.push(topFlush[index]);
						flushNumbers[index] = -Infinity;
					}

					return topOrderedFlush;
					} 
				} 	
			}
			

			var straightHighCard = 0;
			var topStraight = [];
			var straight = checkStraight(numCards);

			function checkStraight(targetLength) {
				hasStraight = false;
				for (var i = 0; i < totalCards.length; ++i) {
					var straightArray = [];
					for (var q = 0; q < targetLength; ++q) {
						straightArray.push(totalCards[i].numValue + q)
					}
					
					if (totalCards[i].value === "ace") {
						if (numCards === 4) {
							straightArray = [14, 2, 3, 4]
						} else {
							straightArray = [14, 2, 3, 4, 5]
						}
					}

					var currentStraight = [];
					var x;
					var count = 0
					while(count < totalCards.length) {
						for (var j = 0; j < totalCards.length; ++j) {
							if (straightArray[0] === totalCards[j].numValue) {
								currentStraight.push(totalCards[j])
								straightArray.splice(0, 1)
								x = j;									
							}
						}
						count++;
						if (currentStraight.length === targetLength) {
							hasStraight = true;
							if (totalCards[x].numValue > straightHighCard) {
								topStraight = currentStraight
								
								straightHighCard = totalCards[x].numValue;
							}
						}
					}
				}

				if (hasStraight === true) {
					return topStraight;
				} 
			}

			var hasStraightFlush;
			var straightFlush = checkStraightFlush(numCards)

			function checkStraightFlush(targetLength) {
				var straight = checkStraight();
				if (straight !== undefined && straight.length === targetLength) {
					var straightFlush = checkFlush(straight);
					if (straightFlush !== undefined) {
						hasStraightFlush = true;
						return straightFlush;
					}
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
			if (hasStraightFlush) {
				return [9, straightFlush, straightFlush[numCards-1].value, " has a high straight-flush"]
			} else if (hasQuads) { 
				return [8, quads, " has four " + quads.value + "s", getKickers(1, [quads.numValue, 0])]
			} else if (hasFullHouse) {		
				return [7, [trips, pairs[0]], " has a full house: " + trips.value + "s full of " + pairs[0].value + "s"]
			} else if (hasFlush) {
				return [6, flush, " has a " + flush[0].value +  " high flush"]
			} else if (straight !== undefined && straight.length === numCards) {
				return [5, straight, " has a " + straight[numCards-1].value + " high straight"]
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


	function shuffle () {
			var i = 0
		    , j = 0
		    , temp = null

		  for (i = deck.length - 1; i > 0; i -= 1) {
		    j = Math.floor(Math.random() * (i + 1))
		    temp = deck[i]
		    deck[i] = deck[j]
		    deck[j] = temp
		  }
		}

	function dealComCards(cardNumber) {

		var cards = deal(1)		

		$.each(cards, function(index, value) {
			game.cards.push(value);
		});
		if (game.userTurn === "first") {
			$("#bet-options *").css("visibility", "hidden");
		}


		$("#com-cards #card" + cardNumber).attr("src", "http://buvesz.blog.hu/media/image/Mandolin_BACK.jpg");
		$("#com-cards #card" + cardNumber).css({"right": "0", "visibility": "visible"});
		$("#com-cards #card" + cardNumber).addClass("in-play");
				
	}

	function sleep(miliseconds) {
   		var currentTime = new Date().getTime();
		
		while (currentTime + miliseconds >= new Date().getTime()) {
	   
	   }
	}

	function dealerTurn() {
		if (game.turn === "preFlop" && user.currentBet === 0) {
			if (dealer.hand[0].numValue === 14 && dealer.hand[1].numValue === 14) {
			 	dealer.bet(350 + (20 * Math.floor(Math.random() * 6)));		 
			} else if((dealer.hand[0].numValue > 10 && dealer.hand[1].numValue > 10 && dealer.hand[0].suit === dealer.hand[1].suit) || (dealer.hand[0].numValue > 10 && dealer.hand[1].numValue > 10 && dealer.hand[0].numValue === dealer.hand[1].numValue)) {
				dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
			} else if ((dealer.hand[0].numValue > 9 && dealer.hand[1].numValue > 9 && dealer.hand[0].numValue === dealer.hand[1].numValue + 1 && dealer.hand[0].suit === dealer.hand[1].suit) || (dealer.hand[0].numValue > 9 && dealer.hand[1].numValue > 9 && dealer.hand[0].numValue + 1 === dealer.hand[1].numValue && dealer.hand[0].suit === dealer.hand[1].suit)) {
				dealer.bet(250 + (20 * Math.floor(Math.random() * 6)));
			} else if((dealer.hand[0].numValue > 12 && dealer.hand[1].numValue > 9) || (dealer.hand[0].numValue > 9 && dealer.hand[1].numValue > 12)) {
				dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
			} else {
				dealer.check();
			}
		} else if (game.turn === "preFlop" && user.currentBet > 0) {			
			if ((game.pot === 750 && user.currentBet === 250) || (user.currentBet <= 250 && user.bankroll === 0)) {	
				if ((dealer.hand[0].numValue > 10 && dealer.hand[1].numValue > 10 && dealer.hand[0].suit === dealer.hand[1].suit) || (dealer.hand[0].numValue > 10 && dealer.hand[1].numValue > 10 && dealer.hand[0].numValue === dealer.hand[1].numValue)) {		
					dealer.bet(350 + (20 * Math.floor(Math.random() * 6)));	
				} else if ((dealer.hand[0].numValue === 7 && dealer.hand[1].numValue === 2 && dealer.hand[0].suit !== dealer.hand[1].suit) || (dealer.hand[0].numValue === 2 && dealer.hand[1].numValue === 7 && dealer.hand[0].suit !== dealer.hand[1].suit) || (dealer.hand[0].numValue === 8 && dealer.hand[1].numValue === 3 && dealer.hand[0].suit !== dealer.hand[1].suit) || (dealer.hand[0].numValue === 3 && dealer.hand[1].numValue === 8 && dealer.hand[0].suit !== dealer.hand[1].suit) || (dealer.hand[0].numValue < 5 && dealer.hand[1].numValue < 5 && dealer.hand[0].suit !== dealer.hand[1].suit && dealer.hand[0].numValue !== dealer.hand[1].numValue)) {
					dealer.fold();
				} else {
					dealer.call();
				}			
			} else if((dealer.hand[0].numValue > 10 && dealer.hand[1].numValue > 10 && dealer.hand[0].suit === dealer.hand[1].suit) || (dealer.hand[0].numValue > 10 && dealer.hand[1].numValue > 10 && dealer.hand[0].numValue === dealer.hand[1].numValue)) {
				if (user.currentBet <= 2000) {
					dealer.bet(user.currentBet);
				} else {
					dealer.call();
				}
			} else if (dealer.hand[0].numValue > 11 && dealer.hand[1].numValue > 11) {
				if (user.currentBet <= 2500) {
					dealer.call();
				} else {
					dealer.fold();
				}
			} else if ((dealer.hand[0].numValue > 9 && dealer.hand[1].numValue > 9 && dealer.hand[0].numValue === dealer.hand[1].numValue + 1 && dealer.hand[0].suit === dealer.hand[1].suit) || (dealer.hand[0].numValue > 9 && dealer.hand[1].numValue > 9 && dealer.hand[0].numValue + 1 === dealer.hand[1].numValue && dealer.hand[0].suit === dealer.hand[1].suit)) {
				if (user.currentBet <= 1500) {
					dealer.call() 
				} else {
					dealer.fold()
				}
			} else if ((dealer.hand[0].numValue > 12 && dealer.hand[1].numValue > 6) || (dealer.hand[0].numValue > 6 && dealer.hand[1].numValue > 9)) {
				if (user.currentBet <= 500) {
					dealer.call() 
				} else {
					dealer.fold()
				}
			} else {
				dealer.fold()
			}
		} else if (game.turn === "flop" && user.currentBet === 0) {			
			drawInfo = dealer.evalHand(4)
			var straightFlushDraw = false;
			if ((drawInfo[0] === 9) && (drawInfo[1].contains(dealer.hand[0]) || drawInfo[1].contains(dealer.hand[1]))) {
				straightFlushDraw = true;
			}
			var betAgressive = Math.floor(Math.random() * 2)			
			var dealerHandInfo = dealer.evalHand(5)
			
			if (betAgressive && (dealerHandInfo[0] === 6 || dealerHandInfo[0] === 5)) {
				dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
			} else if (dealerHandInfo[0] === 9 || dealerHandInfo[0] === 8 || dealerHandInfo[0] === 7 || dealerHandInfo[0] === 6 || dealerHandInfo[0] === 5) {
				dealer.check()			
			} else if (dealerHandInfo[0] === 4) {
				if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {					
					dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));					
				} else if ((dealerHandInfo[1].numValue !== dealer.hand[0].numValue || dealerHandInfo[1].numValue !== dealer.hand[1].numValue) && (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace" || dealer.hand[0].value === "king" || dealer.hand[1].value === "king")) {
					dealer.bet(20 * Math.floor(Math.random() * 6))
				} else {
					dealer.check()
				}
			} else if (dealerHandInfo[0] === 3) {
				if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
					dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));	
				} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 7)) {
					dealer.bet(150 + (20 * Math.floor(Math.random() * 6)));	
				} else {
					dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
				}
			} else if (dealerHandInfo[0] === 2) {
				if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
					if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue)) {
						dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
					} else if (dealerHandInfo[1].numValue > Math.min(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue)) {
						dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
					} else {
						dealer.check()
					}
				} else {
					dealer.check()
				}
			} else if (straightFlushDraw) {
				dealer.bet(100 + (20 * Math.floor(Math.random() * 6))); 
			} else {
				dealer.check()
			}
		} else if (game.turn === "flop" && user.currentBet > 0) {
			
			var drawInfo = dealer.evalHand(4);
			var straightFlushDraw = false;
			var flushDraw = false;
			var straightDraw = false;
			if ((drawInfo[0] === 9) && (drawInfo[1].contains(dealer.hand[0]) || drawInfo[1].contains(dealer.hand[1]))) {
				straightFlushDraw = true;
			} else if ((drawInfo[0] === 6) && (drawInfo[1].contains(dealer.hand[0]) || drawInfo[1].contains(dealer.hand[1]))) {
				flushDraw = true;
			} else if ((drawInfo[0] === 5) && (drawInfo[1].contains(dealer.hand[0]) || drawInfo[1].contains(dealer.hand[1]))) {
				straightDraw = true;
			}

			var dealerHandInfo = dealer.evalHand(5)
			if (betAgressive && (dealerHandInfo[0] === 6 || dealerHandInfo[0] === 5)) {
				dealer.bet(user.currentBet);
			} else if (dealerHandInfo[0] === 9 || dealerHandInfo[0] === 8 || dealerHandInfo[0] === 7 || dealerHandInfo[0] === 6 || dealerHandInfo[0] === 5) {
				dealer.call()			
			} else if (dealerHandInfo[0] === 4) {
				if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
					if (user.currentBet <= 500) {
						dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
					}
					else {
						dealer.call();
					}
				} else if ((dealerHandInfo[1].numValue !== dealer.hand[0].numValue || dealerHandInfo[1].numValue !== dealer.hand[1].numValue) && (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace" || dealer.hand[0].value === "king" || dealer.hand[1].value === "king")) {
					if (user.currentBet <= 1000) {
						dealer.call();
					} else {
						dealer.fold();
					}
				} else {
					dealer.fold();
				}
			} else if (dealerHandInfo[0] === 3) {
				if (user.currentBet <= 500) {
					dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
				} else {
					dealer.call();
				}
			} else if (dealerHandInfo[0] === 2) {
				if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
					if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue)) {
						dealer.call();
					} else if (dealerHandInfo[1].numValue > Math.min(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue)) {
						dealer.call()						
					} else {
						dealer.fold()
					}
				} else {
					dealer.fold()
				}
			} else if (straightFlushDraw) {
				dealer.bet(100 + (20 * Math.floor(Math.random() * 6)));
			} else if ((straightDraw || flushDraw)  && user.currentBet <= 400) {
			  	dealer.call() 
			} else {
				dealer.fold()
			}
		} else if (game.turn === "turn" && user.currentBet === 0) {
			var fourComFlush = false;
			var fourComStraight = false;
			var comInfo = dealer.evalHand(4)
			if (comInfo[0] === 9 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComFlush = true;
				fourComStraight = true;
			} else if (comInfo[0] === 6 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComFlush = true;
			} else if (comInfo[0] === 5 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComStraight = true;
			}

			var betAgressive = Math.floor(Math.random() * 2)			
			var dealerHandInfo = dealer.evalHand(5)


			if (dealerHandInfo[0] === 9 || dealerHandInfo[0] === 8 || dealerHandInfo[0] === 7) {
				dealer.bet(800 + (20 * Math.floor(Math.random() * 6)));
			} else if (dealerHandInfo[0] === 6) {
				if (fourComFlush === false) {
					dealer.bet(800 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 11) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].numValue > 11)) {
					dealer.bet(750 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 8) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].numValue > 8)) {
					dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
				} else {
					dealer.check();
				}
			} else if (dealerHandInfo[0] === 5) {
				if (fourComFlush === false) {
					if (dealerHandInfo[1].contains(dealer.hand[0]) && dealerHandInfo[1].contains(dealer.hand[1])) {
						dealer.bet(750 + (20 * Math.floor(Math.random() * 6)));
					} else if ((dealer.hand[0] === dealerHandInfo[1][4]) || (dealer.hand[1] === dealerHandInfo[1][4])) { 
						dealer.bet(700 + (20 * Math.floor(Math.random() * 6)));					
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0] !== dealerHandInfo[1][0]) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1] !== dealerHandInfo[1][0])) { 
						dealer.bet(700 + (20 * Math.floor(Math.random() * 6)));					
					} else {
						dealer.check();
					}
				} else {
					dealer.check();
				}	
			} else if (dealerHandInfo[0] === 4) {
				if (fourComFlush === false || fourComStraight === false) {	
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {									
						if (dealerHandInfo[1].numValue > 11) {
							dealer.bet(550 + (20 * Math.floor(Math.random() * 6)));
						} else if (dealerHandInfo[1].numValue > 7) {
							dealer.bet(480 + (20 * Math.floor(Math.random() * 6)));
						} else {
							dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
						}					
					} else {
						dealer.check();
					}
				} else {
					dealer.check();
				}
			} else if (dealerHandInfo[0] === 3) {
				if (fourComFlush === false || fourComStraight === false) {
					if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
						dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));	
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 7)) {
						dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));	
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1]) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
						dealer.check();
					} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
						dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));	
					} else {
						dealer.check();
					}
				} else {
					dealer.check()
				}
			} else if (dealerHandInfo[0] === 2) {
				if (fourComFlush === false || fourComStraight === false) {
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
						if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue)) {
							dealer.bet(150 + (20 * Math.floor(Math.random() * 6)));
						} else if (dealerHandInfo[1].numValue > 10) {
							dealer.bet(100 + (20 * Math.floor(Math.random() * 6)));
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
			var fourComFlush = false;
			var fourComStraight = false;
			var comInfo = dealer.evalHand(4)
			if (comInfo[0] === 9 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComFlush = true;
				fourComStraight = true;
			} else if (comInfo[0] === 6 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComFlush = true;
			} else if (comInfo[0] === 5 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComStraight = true;
			}			
			var drawInfo = dealer.evalHand(4)
			var flushDraw = false;
			var straightDraw = false;
			
			if ((drawInfo[0] === 6) && (drawInfo[1].contains(dealer.hand[0]) || drawInfo[1].contains(dealer.hand[1]))) {
				flushDraw = true;
			}
			if ((drawInfo[0] === 5) && (drawInfo[1].contains(dealer.hand[0]) || drawInfo[1].contains(dealer.hand[1]))) {
				straightDraw = true;
			}
			var betAgressive = Math.floor(Math.random() * 2)			
			var dealerHandInfo = dealer.evalHand(5)
			if (dealerHandInfo[0] === 9 || dealerHandInfo[0] === 8 || dealerHandInfo[0] === 7) {
				dealer.bet(user.currentBet + (500 + (20 * Math.floor(Math.random() * 6))));
			} else if (dealerHandInfo[0] === 6) {
				if (fourComFlush === false) {
					dealer.bet(user.currentBet);
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 11) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].numValue > 11)) {
					dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 7) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].numValue > 7)) {
					if (user.currentBet <= 500) {
						dealer.call();
					} else {
						dealer.fold();
					}
				} else {
					dealer.fold();
				}
			} else if (dealerHandInfo[0] === 5) {
				if (fourComFlush === false) {
					if (dealerHandInfo[1].contains(dealer.hand[0]) && dealerHandInfo[1].contains(dealer.hand[1])) {
						dealer.bet(user.currentBet + (300 + (20 * Math.floor(Math.random() * 6))));
					} else if ((dealer.hand[0] === dealerHandInfo[1][4]) || (dealer.hand[1] === dealerHandInfo[1][4])) { 
						dealer.bet(user.currentBet(200 + (20 * Math.floor(Math.random() * 6))));					
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
				if (fourComFlush === false || fourComStraight === false) {
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {									
						if (dealerHandInfo[1].numValue > 7) {
							dealer.bet(user.currentBet);
						} else {
							dealer.bet(100 + (20 * Math.floor(Math.random() * 6)));
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
				if (fourComFlush === false || fourComStraight === false) {
					if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
						if (user.currentBet <= 500) {
							dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
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
						dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));	
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
				if (fourComFlush === false || fourComStraight === false) {
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
						} else if ((betAgressive && dealerHandInfo[1].numValue >= 10) || (straightDraw || flushDraw)) {
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
				}
			} else {
				dealer.fold();
			}

		} else if (game.turn === "river" && user.currentBet === 0 && game.userTurn === "first") {
		
			var fourComFlush = false;
			var fourComStraight = false;
			var comInfo = dealer.evalHand(4)
			if (comInfo[0] === 9 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComFlush = true;
				fourComStraight = true;
			} else if (comInfo[0] === 6 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComFlush = true;
			} else if (comInfo[0] === 5 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComStraight = true;
			}
			var betAgressive = Math.floor(Math.random() * 2);			
			var dealerHandInfo = dealer.evalHand(5);

			if (dealerHandInfo[0] === 9) {
				if (dealerHandInfo[1].contains(dealer.hand[0]) || dealerHandInfo[1].contains(dealer.hand[1])) {
					dealer.bet(500 + (20 * Math.floor(Math.random() * 6)));	
				} else {
					dealer.check();
				}
			} else if (dealerHandInfo[0] === 8) {
				if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
					dealer.bet(500 + (20 * Math.floor(Math.random() * 6)));
				} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
					dealer.bet(500 + (20 * Math.floor(Math.random() * 6)));
				} else {
					if (Math.floor(Math.random() * 4) === 1) {
						dealer.bet(500 + (20 * Math.floor(Math.random() * 6)));
					} else {
						dealer.check();
					}
				}
			} else if (dealerHandInfo[0] === 7) {
				if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) && (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
					dealer.bet(600 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
					dealer.bet(450 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue, game.cards[4].numValue))) {
					dealer.bet(700 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue > 10)) {
					dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
				} else if (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) {
					dealer.bet(150 + (20 * Math.floor(Math.random() * 6)));
				} else {
					dealer.check();
				}
			} else if (dealerHandInfo[0] === 6) {
				if (fourComFlush === false) {
					dealer.bet(500 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].value === "ace")  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value === "ace")) {
					dealer.bet(500 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 10)  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value > 10)) {
					dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 5)  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value > 5)) {
					dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
				} else if (dealerHandInfo[1].contains(dealer.hand[0]) || dealerHandInfo[1].contains(dealer.hand[1])) {
					dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
				} else {
					dealer.check()
				}
			} else if (dealerHandInfo[0] === 5) {
				if (fourComFlush === false) {
					if ((dealerHandInfo[1].contains(dealer.hand[0]) === false) && (dealerHandInfo[1].contains(dealer.hand[1]) === false)) {
						if (Math.floor(Math.random() * 5) === 1) {
							dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
						} else {
							dealer.check();
						}
					}
					else if (dealerHandInfo[1].contains(dealer.hand[0]) && dealerHandInfo[1].contains(dealer.hand[1])) {
						dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
					} else if ((dealer.hand[0] === dealerHandInfo[1][4]) || (dealer.hand[1] === dealerHandInfo[1][4])) { 
						dealer.bet(350 + (20 * Math.floor(Math.random() * 6)));					
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0] !== dealerHandInfo[1][0]) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1] !== dealerHandInfo[1][0])) { 
						dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));					
					} else if (dealer.hand[0] === dealerHandInfo[1][0] || dealer.hand[1] === dealerHandInfo[1][0]) {
						dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
					}
				} else {
					dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
				}
			} else if (dealerHandInfo[0] === 4) {
				if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {									
					if (dealerHandInfo[1].numValue > 11) {
						dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
					} else if (dealerHandInfo[1].numValue > 7) {
						dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
					} else {
						dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
					}					
				} else if (dealer.hand[0].value === "ace" || dealer.hand[0].value === "ace") {
					dealer.bet(150 + (20 * Math.floor(Math.random() * 6)));
				} else if (Math.floor(Math.random() * 4) === 1) {
					dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
				} else {
					dealer.check();
				}
			} else if (dealerHandInfo[0] === 3) {
				if (fourComFlush === false && fourComStraight === false) {
					if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
						dealer.bet(500 + (20 * Math.floor(Math.random() * 6)));
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) ) {
						dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
						dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));	
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 7)) {
						dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));	
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
						dealer.bet(100 + (20 * Math.floor(Math.random() * 6)));
					} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
						dealer.bet(100 + (20 * Math.floor(Math.random() * 6)));
					} else if (Math.floor(Math.random() * 5) === 1) {
						dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
					} else {
						dealer.check();
					}
				} else {
					if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
						dealer.bet(250 + (20 * Math.floor(Math.random() * 6)));
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) ) {
						dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
						dealer.bet(150 + (20 * Math.floor(Math.random() * 6)));	
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 7)) {
						dealer.bet(100 + (20 * Math.floor(Math.random() * 6)));	
					} else {
						dealer.check();
					}
				}
			} else if (dealerHandInfo[0] === 2) {
				if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
					if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue)) {
						dealer.bet(250 + (20 * Math.floor(Math.random() * 6)));
					} else if (dealerHandInfo[1].numValue > 10) {
						dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
					} else {
						dealer.bet(100 + (20 * Math.floor(Math.random() * 6)));
					}
				} else if (dealer.hand[0].value === "ace" || dealer.hand[0].value === "ace") {
					if (Math.floor(Math.random() * 4) === 1) {
						dealer.bet(100 + (20 * Math.floor(Math.random() * 6)));
					} else {
						dealer.check();
					}
				} else {
					if (Math.floor(Math.random() * 6) === 1) {
						dealer.bet(150 + (20 * Math.floor(Math.random() * 6)));
					} else {
						dealer.check();
					}
				}
			} else {
				if (dealer.hand[0].value === "ace" || dealer.hand[0].value === "ace") {
					dealer.bet(150 + (20 * Math.floor(Math.random() * 6)));
				} else if (Math.floor(Math.random() * 3) === 1) {
					dealer.bet(150 + (20 * Math.floor(Math.random() * 6)));
				} else {
					dealer.check();
				}				
			}
		} else if (game.turn === "river" && user.currentBet === 0 && game.userTurn === "second") {

			var fourComFlush = false;
			var fourComStraight = false;
			var comInfo = dealer.evalHand(4)
			if (comInfo[0] === 9 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComFlush = true;
				fourComStraight = true;
			} else if (comInfo[0] === 6 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComFlush = true;
			} else if (comInfo[0] === 5 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComStraight = true;
			}

			var betAgressive = Math.floor(Math.random() * 2);			
			var dealerHandInfo = dealer.evalHand(5);
				
			if (dealerHandInfo[0] === 9) {
				if (dealerHandInfo[1].contains(dealer.hand[0]) || dealerHandInfo[1].contains(dealer.hand[1])) {
					dealer.bet(1000 + (20 * Math.floor(Math.random() * 6)));	
				} else {
					dealer.check();
				}
			} else if (dealerHandInfo[0] === 8) {
				if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
					dealer.bet(950 + (20 * Math.floor(Math.random() * 6)));
				} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
					dealer.bet(900 + (20 * Math.floor(Math.random() * 6)));
				} else {
					dealer.check();
				}
			} else if (dealerHandInfo[0] === 7) {
				if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) && (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
					dealer.bet(800 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
					dealer.bet(750 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue, game.cards[4].numValue))) {
					dealer.bet(700 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue > 10)) {
					dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
				} else if (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) {
					dealer.bet(150 + (20 * Math.floor(Math.random() * 6)));
				} else {
					dealer.check();
				}
			} else if (dealerHandInfo[0] === 6) {
				if (fourComFlush === false) {
					dealer.bet(700 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].value === "ace")  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value === "ace")) {
					dealer.bet(800 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 10)  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value > 10)) {
					dealer.bet(600 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 6)  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value > 6)) {
					dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
				} else if (dealerHandInfo[1].contains(dealer.hand[0]) || dealerHandInfo[1].contains(dealer.hand[1])) {
					dealer.bet(100 + (20 * Math.floor(Math.random() * 6)));
				} else {
					dealer.check()
				}
			} else if (dealerHandInfo[0] === 5) {
				if (fourComFlush === false) {
					if ((dealerHandInfo[1].contains(dealer.hand[0]) === false) && (dealerHandInfo[1].contains(dealer.hand[1]) === false)) {
						dealer.check();
					}
					if (dealerHandInfo[1].contains(dealer.hand[0]) && dealerHandInfo[1].contains(dealer.hand[1])) {
						dealer.bet(800 + (20 * Math.floor(Math.random() * 6)));
					} else if ((dealer.hand[0] === dealerHandInfo[1][4]) || (dealer.hand[1] === dealerHandInfo[1][4])) { 
						dealer.bet(700 + (20 * Math.floor(Math.random() * 6)));					
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0] !== dealerHandInfo[1][0]) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1] !== dealerHandInfo[1][0])) { 
						dealer.bet(650 + (20 * Math.floor(Math.random() * 6)));					
					} else if (dealer.hand[0] === dealerHandInfo[1][0] || dealer.hand[1] === dealerHandInfo[1][0]) {
						dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
					}
				} else if (betAgressive) {
					dealer.bet(500 + (20 * Math.floor(Math.random() * 6)));
				} else {
					dealer.check()
				}
			} else if (dealerHandInfo[0] === 4) {
				if (fourComFlush === false && fourComStraight === false) {
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {									
						if (dealerHandInfo[1].numValue > 11) {
							dealer.bet(550 + (20 * Math.floor(Math.random() * 6)));
						} else if (dealerHandInfo[1].numValue > 7) {
							dealer.bet(480 + (20 * Math.floor(Math.random() * 6)));
						} else {
							dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
						}					
					} else {
						dealer.check();
					}
				} else {
					dealer.check();
				}
			} else if (dealerHandInfo[0] === 3) {
				if (fourComFlush === false && fourComStraight === false) {
					if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
						dealer.bet(500 + (20 * Math.floor(Math.random() * 6)));
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue))) {
						dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 11) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 11)) {
						dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));	
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue > 6) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue > 7) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[0].numValue > 7)) {
						dealer.bet(100 + (20 * Math.floor(Math.random() * 6)));	
					} else {
						dealer.check();
					}
				} else {
					dealer.check();
				}
			} else if (dealerHandInfo[0] === 2) {
				if (fourComFlush === false && fourComStraight === false) {
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
						if (dealerHandInfo[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue)) {
							dealer.bet(150 + (20 * Math.floor(Math.random() * 6)));
						} else if (dealerHandInfo[1].numValue > 10) {
							dealer.bet(100 + (20 * Math.floor(Math.random() * 6)));
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
			var fourComFlush = false;
			var fourComStraight = false;
			var comInfo = dealer.evalHand(4)
			if (comInfo[0] === 9 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComFlush = true;
				fourComStraight = true;
			} else if (comInfo[0] === 6 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComFlush = true;
			} else if (comInfo[0] === 5 && (comInfo[1].contains(dealer.hand[0]) === false) && (comInfo[1].contains(dealer.hand[1]) === false)) {
				fourComStraight = true;
			}
			var betAgressive = Math.floor(Math.random() * 2);			
			var dealerHandInfo = dealer.evalHand(5);
				
			if (dealerHandInfo[0] === 9) {
				if (dealerHandInfo[1].contains(dealer.hand[0]) || dealerHandInfo[1].contains(dealer.hand[1])) {
					dealer.bet(user.currentBet + (1000 + (20 * Math.floor(Math.random() * 6))));	
				} else {
					if (betAgressive) {
						dealer.call();
					} else {
						dealer.fold();
					}
				}
			} else if (dealerHandInfo[0] === 8) {
				if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {
					dealer.bet(user.currentBet + (950 + (20 * Math.floor(Math.random() * 6))));
				} else if (dealer.hand[0].value === "ace" || dealer.hand[1].value === "ace") {
					dealer.bet(900 + (20 * Math.floor(Math.random() * 6)));
				} else {
					dealer.call();
				}
			} else if (dealerHandInfo[0] === 7) {
				if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[0].numValue) && (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue)) {
					dealer.bet(user.currentBet + (300 + (20 * Math.floor(Math.random() * 6))));
				} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue || dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
					dealer.bet(user.currentBet + (200 + (20 * Math.floor(Math.random() * 6))));
				} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue, game.cards[3].numValue, game.cards[4].numValue))) {
					dealer.bet(user.currentBet + (100 + (20 * Math.floor(Math.random() * 6))));
				} else if ((dealerHandInfo[1][1].numValue === dealer.hand[0].numValue || dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) && (dealerHandInfo[1][1].numValue > 10)) {
					dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
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
				if (fourComFlush === false) {
					dealer.bet(700 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].value === "ace")  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value === "ace")) {
					dealer.bet(500 + (20 * Math.floor(Math.random() * 6)));
				} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0].numValue > 10)  || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1].value > 10)) {
					dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
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
				if (fourComFlush === false) {
					if ((dealerHandInfo[1].contains(dealer.hand[0]) === false) && (dealerHandInfo[1].contains(dealer.hand[1]) === false)) {
						dealer.fold();
					}
					if (dealerHandInfo[1].contains(dealer.hand[0]) && dealerHandInfo[1].contains(dealer.hand[1])) {
						dealer.bet(800 + (20 * Math.floor(Math.random() * 6)));
					} else if ((dealer.hand[0] === dealerHandInfo[1][4]) || (dealer.hand[1] === dealerHandInfo[1][4])) { 
						dealer.bet(700 + (20 * Math.floor(Math.random() * 6)));					
					} else if ((dealerHandInfo[1].contains(dealer.hand[0]) && dealer.hand[0] !== dealerHandInfo[1][0]) || (dealerHandInfo[1].contains(dealer.hand[1]) && dealer.hand[1] !== dealerHandInfo[1][0])) { 
						dealer.bet(250 + (20 * Math.floor(Math.random() * 6)));					
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
				if (fourComFlush === false && fourComStraight === false) {
					if (dealerHandInfo[1].numValue === dealer.hand[0].numValue || dealerHandInfo[1].numValue === dealer.hand[1].numValue) {									
						if (dealerHandInfo[1].numValue > 11) {
							dealer.bet(550 + (20 * Math.floor(Math.random() * 6)));
						} else if (dealerHandInfo[1].numValue > 7) {
							dealer.bet(400 + (20 * Math.floor(Math.random() * 6)));
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
				if (fourComFlush === false && fourComStraight === false) {
					if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealerHandInfo[1][1].numValue === dealer.hand[1].numValue) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealerHandInfo[1][0].numValue === dealer.hand[1].numValue)) {
						if (user.currentBet <= 300 && game.pot <= 3000 ) {
							dealer.bet(300 + (20 * Math.floor(Math.random() * 6)));
						} else {
							dealer.call();
						}
					} else if ((dealerHandInfo[1][0].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][0].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[0].numValue && dealer.hand[0].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue)) || (dealerHandInfo[1][1].numValue === dealer.hand[1].numValue && dealer.hand[1].numValue >= Math.max(game.cards[0].numValue, game.cards[1].numValue, game.cards[2].numValue,game.cards[3].numValue, game.cards[4].numValue))) {
						if (user.currentBet <= 300 && game.pot <= 3000 ) {
							dealer.bet(200 + (20 * Math.floor(Math.random() * 6)));
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
				if (fourComFlush === false && fourComStraight === false) {
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
		$("#deck").html("<img src=http://buvesz.blog.hu/media/image/Mandolin_BACK.jpg>")

		user.playerName = userName;

		$("#user p").html("$" + user.bankroll);
 		genChips("#user-chips", user.bankroll);
 		$("#dealer p").html("$" + dealer.bankroll);
 		genChips("#dealer-chips", dealer.bankroll);
 		debugger;

		$("#user-card1").css({"right": "0", "bottom": "0"}).addClass("dealt");
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
			$("#message").css("opacity", "0")
		}
		user.currentBet = 0;
		
		switch(game.turn) {
			case "preFlop":
			game.turn = "flop"
			user.currentBet = 0;
			dealer.currentBet = 0;
			dealComCards(1);
			$("#com-cards #card1").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
				dealComCards(2);
				// $("#com-cards #card1").html("<img src=" + game.cards[0].image+">");
				$("#com-cards #card1").attr("src", game.cards[0].image);
			});
			$("#com-cards #card2").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
			
				dealComCards(3);
				// $("#com-cards #card2").html("<img src=" + game.cards[1].image+">");
				$("#com-cards #card2").attr("src", game.cards[1].image);
		
			});
			$("#com-cards #card3").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
				
				// $("#com-cards #card3").html("<img src=" + game.cards[2].image+">");
				$("#com-cards #card3").attr("src", game.cards[2].image);	
				$("#bet-options button").css("visibility", "visible");			
				$("#message").css("opacity", "0")
			
			
				$("#card1, #card2, #card3").css("visibility", "visible");
				if (user.bankroll === 0 || dealer.bankroll === 0) {
					endTurn();
				} else if (game.userTurn === "first") {
					$("#check, #bet").show();
					$("#call, #raise, #fold").hide();
				} else {
					dealerTurn()
				}
			});
			break;
				
			case "flop":

			game.turn = "turn"
			
			user.currentBet = 0;
			dealer.currentBet = 0;
			dealComCards(4);
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
					dealerTurn()
				}
			});
			
			
			break;

			case "turn":

			game.turn = "river"
			user.currentBet = 0;
			dealer.currentBet = 0;
			dealComCards(5);
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
					}
					else if (dealerHandInfo[1][i].numValue > userHandInfo[1][i].numValue) {
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
					$("#pot-chips img").css("bottom", "-498px");
				},500);
				user.bankroll += game.pot;
			} else if (dealerWins === true) {
				$("#message").css("visibility", "visible");
				$("#message").html(userMessage + "<br>" + dealerMessage + "<br>" + dealer.playerName + " wins $" + game.pot);
				setTimeout(function(){
					// $("#pot-chips").css("transition", "bottom .4s linear");
					$("#pot-chips img").addClass("add-pot");
					$("#pot-chips img").css("bottom", "249px");
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
				$("#next-hand").css("visibility", "hidden");
			} else if (dealer.bankroll === 0) {
				$("#message").html(dealerMessage + "<br>" + userMessage + "<br>" + user.playerName + " wins $" + game.pot + "<br>" + "You Win");				
				$("#next-hand").css("visibility", "hidden");
			}

			$("#dealer-card1").attr("src", dealer.hand[0].image)
			$("#dealer-card2").attr("src", dealer.hand[1].image)
			
			$("#pot p").css("visibility","hidden");
			// $("#user p").html("$" + user.bankroll);
			// genChips("#user-chips", user.bankroll);
			// $("#dealer p").html("$" + dealer.bankroll);
			// genChips("#dealer-chips", dealer.bankroll);
			$("#message").css({"opacity": "1", "visibility": "visible"});
			
			$("#bet-options *").css("visibility", "hidden");

			game.pot = 0;
					
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
		
		$("#user-card1").attr("src", user.hand[1].image)
		if (game.userTurn === "first") {
			$("#dealer-card1").css({"right": "0", "top": "0"}).addClass("dealt");
			
		} else {
			$("#dealer-card2").css({"right": "0", "top": "0"}).addClass("dealt");
		}
		
	});
	$("#dealer-card1").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {

		if (game.userTurn === "first") {
			$("#user-card2").css({"right": "0", "bottom": "0"}).addClass("dealt");
		} else {
			$("#user-card1").css({"right": "0", "bottom": "0"}).addClass("dealt");
		}
	});
	$("#user-card2").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		
		$("#user-card2").attr("src", user.hand[0].image)
		if (game.userTurn === "first") {
			$("#dealer-card2").css({"right": "0", "top": "0"}).addClass("dealt");
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
			$("#user-card2").css({"right": "0", "bottom": "0"}).addClass("dealt");		
		}
	});

	$("#user-bet-chips").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		
		$("#user-bet-chips img, #dealer-bet-chips img").remove();

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
			$("#dealer-bet-chips").css("bottom", "-59px");
		},100)	

		if (user.bankroll === 0 && user.currentBet === 0) {
			$("#message").html("all in").addClass("fade");
			$("#bet-options *").hide();
			return;
		}

		if (game.turn === "preFlop" && game.pot === 1000) {
    		if (game.userTurn === "first") {
    			dealerTurn();
    			return
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
		console.log()
		if (game.turn === "preFlop" && game.pot === 1000) {
			$("#pot p").html("pot: $" + game.pot).val();
			genChips("#pot-chips", game.pot);
			$("#dealer-bet-chips").removeClass("add-pot");
			$("#dealer-bet-chips").css("bottom", "0");
			$("#dealer-bet-chips img").remove();
		}
	});

	$("#pot-chips").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		
		if ($("#pot-chips img").css("bottom") === "249px") {
			genChips("#dealer-chips", dealer.bankroll);
			$("#dealer p").html("$" + dealer.bankroll).addClass("add-funds");
		} else if ($("#pot-chips img").css("bottom") === "-498px") {
			genChips("#user-chips", user.bankroll);
			$("#user p").html("$" + user.bankroll).addClass("add-funds");
		} else {
			alert("error")
		}	
			
		$("#pot-chips img").remove();
		// $("#pot-chips").removeClass("add-pot").css("bottom","0");
		$("#user-bet-chips").css("visibility","hidden");
		if (dealer.bankroll !== 0 && user.bankroll !== 0) {
			setTimeout(function(){
				$("#next-hand").css("visibility","visible");
			},800)
		}	
	});

	$("#pot-chips2").on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		// genChips("#user-chips", user.bankroll);
		// $("#user p").html("$" + user.bankroll).addClass("add-funds");
		// $("#pot-chips img").remove();
		genChips("#dealer-chips", dealer.bankroll);
		$("#dealer p").html("$" + dealer.bankroll).addClass("add-funds");
		$("#pot-chips2 img").remove();
	});
});