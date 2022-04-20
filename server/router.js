const router = require('express').Router();
const UsersController = require('./controllers/UsersController');
const authMiddleware = require('./controllers/authMiddleware');

// router.get('/users', UsersController.index); //! TODO delete
router.get('/users', authMiddleware, UsersController.show);
router.post('/users/login', UsersController.login);
router.post('/users/create', UsersController.create);


module.exports = router;