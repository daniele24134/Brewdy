const router = require('express').Router();
const UsersController = require('./controllers/UsersController');
const authMiddleware = require('./controllers/authMiddleware'); // TODO delete this

// router.get('/users', UsersController.index); //! TODO delete
router.get('/users', UsersController.show);
router.post('/users/login', UsersController.login);
router.post('/users/create', UsersController.create);


module.exports = router;