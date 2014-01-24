    // dependencies
var mongoose = require('mongoose'),
    Services = require('../services');


    // schema
var player = new mongoose.Schema({

    name: {
        first: String,
        last:  String,
        nick:  String
    },

});


    // concatenate the full name
player.virtual('name.full').get(function () {
    return this.name.first + ' &quot;' + this.name.nick + '&quot; ' + this.name.last;
});


    // middleware
player.pre('save', function (next) {

    Services.updateLadderFromPlayer(this, function (err, ladder) {

        if (err) {
            next(err);
        }
        else {
            next();
        }

    });

});


module.exports = mongoose.model('Player', player);
