    // dependencies
var mongoose = require('mongoose'),
    Services = require('../services');


    // schema
var match = new mongoose.Schema({

		// type
    match_type: {
    	type: String,
    	enum: ['regulation', 'forfeit']
    },

    	// standing
    winner_id: {
    	type: mongoose.Schema.ObjectId,
		ref:  'Player'
    },
    loser_id: {
    	type: mongoose.Schema.ObjectId,
		ref: 'Player'
    },

    	// player 1
    player1_id: {
    	type: mongoose.Schema.ObjectId,
		ref:  'Player'
    },
    player1_game1: Number,
    player1_game2: Number,
    player1_game3: Number,

    	// player 2
    player2_id: {
    	type: mongoose.Schema.ObjectId,
		ref:  'Player'
    },
	player2_game1: Number,
    player2_game2: Number,
    player2_game3: Number

});


    // middleware
match.pre('save', function (next) {

        /**
         * Calculate the winner of the match
         */

    var player1_wins = player2_wins = 0;

        // game 1
    if (this.player1_game1 > this.player2_game1) {
        player1_wins++;
    }
    else {
        player2_wins++;
    }

        // game 2
    if (this.player1_game2 > this.player2_game2) {
        player1_wins++;
    }
    else {
        player2_wins++;
    }

        // game 3
    if (this.player1_game3 && this.player2_game3) {
        if (this.player1_game3 > this.player2_game3) {
            player1_wins++;
        }
        else {
            player2_wins++;
        }
    }

        // determine the winner and loser
    if (player1_wins > player2_wins) {
        this.winner_id = this.player1_id;
        this.loser_id = this.player2_id;
    }
    else {
        this.winner_id = this.player2_id;
        this.loser_id = this.player1_id;
    }

    Services.updateLadderFromMatch(this, function (err, ladder) {

        if (err) {
            next(err);
        }
        else {
            next();
        }

    });

});


module.exports = mongoose.model('Match', match);
