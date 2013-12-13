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


module.exports = mongoose.model('Player', player);
