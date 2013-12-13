    // dependencies
var mongoose = require('mongoose');


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


module.exports = mongoose.model('Player', player);
