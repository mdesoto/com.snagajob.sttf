    // dependencies
var mongoose = require('mongoose'),
    Ladder   = require('../models/ladder.js');


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
