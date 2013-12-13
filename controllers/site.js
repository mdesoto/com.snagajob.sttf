    // dependencies
var needle   = require('needle'),
    mongoose = require('mongoose'),
    Player   = require('../models/player.js'),
    Match    = require('../models/match.js'),
    Ladder   = require('../models/ladder.js');


    // home
exports.home = function(req, res) {

    Ladder.getLatest(true, function (err, ladder) {

        if (err) {
            console.error(err);
            res.send(500, err);
        }
        else {
            res.render('index', { title: 'S.T.T.F', ladder: ladder });
        }

    });

};

    // log
exports.log = function(req, res) {

    Player.find({}).sort('name.last').exec(function (err, players) {

        if (err) {
            console.error(err);
            res.send(500, err);
        }
        else {
            res.render('log', { title: 'Log your Match', players: players });
        }

    });

};

    // log.post
exports.log.post = function(req, res) {

    needle.post('http://localhost:3000/match', req.body, function (err, resp, body) {
        if (err) {
            res.send(500, resp);
        }
        else {
            res.redirect('/');
        }
    });

};


    // join
exports.join = function(req, res) {

    Player.find({}).sort('name.last').exec(function (err, players) {

        if (err) {
            console.error(err);
            res.send(500, err);
        }
        else {
            res.render('log', { title: 'Log your Match', players: players });
        }

    });

};