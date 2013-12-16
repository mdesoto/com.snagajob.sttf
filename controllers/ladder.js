    // dependencies
var mongoose = require('mongoose'),
    Ladder   = require('../models/ladder.js'),
    Player   = require('../models/player.js');


    // GET - All
exports.get = function(req, res) {

    Ladder.getLatest(true, function (err, ladder) {

        if (err) {
            console.error(err);
            res.send(500, err);
        }
        else {
            res.send(ladder);
        }

    });

};

exports.seed = function(req, res) {

    Player.find({}).sort('name.last DESC').exec(function (err, players) {

        var seed = new Ladder({
            players: players.map(function (player) { return player.id; })
        });

        seed.save(function (err, saved) {
            console.log(saved);
        });

    });

};