    // dependencies
var mongoose = require('mongoose'),
    Player   = require('../models/player.js');


    // GET - All
exports.getAll = function(req, res) {

    Player.find({}, function (err, players) {

        if (err) {
            console.error(err);
            res.send(500, err);
        }
        else {
            res.send(players);
        }

    });

};


    // GET - One
exports.getOne = function(req, res) {

    Player.find({ _id: req.params.id }, function (err, result) {

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

    var playa = new Player({
        name: {
            first: req.body.first_name,
            last:  req.body.last_name,
            nick:  req.body.nickname
        }
    });

    playa.save(function (err, saved) {

        if (err) {
            console.error(err);
            res.send(500, err);
        }
        else {
            res.send(saved);
        }

    });

};
