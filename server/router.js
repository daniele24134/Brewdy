const router = require('express').Router();
const UsersController = require('./controllers/UsersController');
const BeersController = require('./controllers/BeersController');
const CommentsController = require('./controllers/Commentscontroller');
const authMiddleware = require('./controllers/authMiddleware'); // TODO delete this


// users
router.get('/users/:id', UsersController.show);
router.post('/users/login', UsersController.login);
router.post('/users/create', UsersController.create);

//beers
router.post('/beers/:userId', BeersController.create);
router.get('/beers/increment/:id', BeersController.increment);
router.get('/beers/decrement/:id', BeersController.decrement);
router.delete('/beers/:id', BeersController.destroy);
router.get('/beers/toggleWish/:id', BeersController.toggleWish);
router.get('/beers/:bid', BeersController.getByBid);

//comments
router.delete('/comments/:id/users/:userId', CommentsController.deleteComment);
router.get('/comments/:beerId', CommentsController.showCommentsByBeer);
router.post('/comments', CommentsController.create);
module.exports = router;