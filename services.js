    // dependencies
var mongoose = require('mongoose'),
    Match    = require('./models/match'),
    Ladder   = require('./models/ladder'),
    Player   = require('./models/player');


exports.updateLadderFromMatch = function (match, cb) {

    Ladder.getLatest(false, function (err, currentLadder) {

        // new order of the ladder
        var newLadder = new Array();


        // if a match is forfeited, the loser moves to the end of the ladder
        // and the other player remains where they are
        if (match.match_type == 'forfeit') {
            for (var i = 0; i < currentLadder.players.length; i++) {
                if (currentLadder.players[i] != match.loser_id) {
                    newLadder.push(currentLadder.players[i]);
                }
            }

            newLadder.push(match.loser_id);
        }

        // if this is a normal scored match, then we handle swapping the winner / loser
        // based on their current standings
        else {

            // new order of the ladder
            // copy the array or else it acts as a pointer
            newLadder = currentLadder.players.slice(0);

            var winnerPosition = currentLadder.players.indexOf(match.winner_id);
            var loserPosition  = currentLadder.players.indexOf(match.loser_id);

            if (winnerPosition > loserPosition) {
                for (var i = loserPosition; i <= winnerPosition; i++) {
                    if (i == loserPosition) {
                        newLadder[i] = match.winner_id;
                    }
                    else {
                        newLadder[i] = currentLadder.players[i-1];
                    }
                }
            }

        }


        var ladder = new Ladder({
            event_match_id: mongoose.Types.ObjectId(match.id),
            players:        newLadder
        });


        ladder.save(function (err, saved) {
            cb(err, saved);
        });

    });

};

exports.updateLadderFromPlayer = function (player, cb) {

    Ladder.getLatest(false, function (err, currentLadder) {

        currentLadder.players.push(player);

        var ladder = new Ladder({
            event_player_id: mongoose.Types.ObjectId(player.id),
            players: currentLadder.players
        });

        ladder.save(function (err, saved) {
            cb(err, saved);
        });

    });

};
