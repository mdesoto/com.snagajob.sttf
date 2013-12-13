    // dependencies
var playerController = require('./controllers/player'),
    matchController  = require('./controllers/match'),
    ladderController = require('./controllers/ladder');


module.exports = function(app) {

        // routes

    app.get('/players',    playerController.getAll);
    app.get('/player/:id', playerController.getOne);
    app.post('/player',    playerController.post);

    app.get('/matches',    matchController.getAll);
    app.get('/match/:id',  matchController.getOne);
    app.post('/match',     matchController.post);

    app.get('/ladder',     ladderController.get);

};
