    // dependencies
var mongoose = require('mongoose'),
    Match    = require('../models/match.js'),
    Ladder   = require('../models/ladder.js');


    // GET - All
exports.getAll = function(req, res) {

    Match.find({}).populate('winner_id loser_id player1_id player2_id').exec(function (err, matches) {

        if (err) {
            console.error(err);
            res.send(500, err);
        }
        else {
            res.send(matches);
        }

    });

};


    // GET - One
exports.getOne = function(req, res) {

    Match.find({ _id: req.params.id }).populate('winner_id loser_id player1_id player2_id').exec(function (err, result) {

        if (err) {
            console.error(err);
            res.send(500, err);
        }
        else {
            res.send(result);
        }

    });

};


    // POST
exports.post = function(req, res) {

    if (req.body.player1 == req.body.player2) {
        res.send(500, 'Players can not play with themselves!');
    }
    else if ((req.body.player1_game1 == req.body.player2_game1) ||
             (req.body.player1_game2 == req.body.player2_game2) ||
             ((req.body.player1_game3 && req.body.player2_game3) && (req.body.player1_game3 == req.body.player2_game3))) {
        res.send(500, 'Games may not end in a tie!');
    }
    else {

        var newMatch = new Match({
            match_type: 'regulation',

            player1_id:    mongoose.Types.ObjectId(req.body.player1),
            player1_game1: req.body.player1_game1,
            player1_game2: req.body.player1_game2,
            player1_game3: req.body.player1_game3,

            player2_id:    mongoose.Types.ObjectId(req.body.player2),
            player2_game1: req.body.player2_game1,
            player2_game2: req.body.player2_game2,
            player2_game3: req.body.player2_game3
        });

        newMatch.save(function (err, saved) {

            if (err) {
                console.error(err);
                res.send(500, err);
            }
            else {
                res.send(saved);
            }

        });

    }

};
