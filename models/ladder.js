    // dependencies
var mongoose = require('mongoose'),
    stampIt  = require('mongoose-stamp'),
    Player   = require('./player');


    // schema
var ladder = new mongoose.Schema({

        // match that triggered a ladder change
    event_match_id: {
        type: mongoose.Schema.ObjectId,
        ref:  'Match'
    },

        // player that triggered a ladder change
    event_player_id: {
        type: mongoose.Schema.ObjectId,
        ref:  'Player'
    },

        // ladder of players
    players: [{
        type: mongoose.Schema.ObjectId,
        ref:  'Player'
    }]

});


ladder.plugin(stampIt);


    // custom model methods / statics
ladder.statics.getLatest = function (populate, cb) {
    if (populate === true) {
        this.findOne({}).sort('-createdAt').populate('players').exec(function(err, latest) {
            cb(err, latest);
        });
    }
    else {
        this.findOne({}).sort('-createdAt').exec(function(err, latest) {
            cb(err, latest);
        });
    }
}


module.exports = mongoose.model('Ladder', ladder, 'ladder');
