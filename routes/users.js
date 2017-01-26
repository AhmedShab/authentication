const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });


/*
 * GET
 */
router.get('/', requireAuth, function(req, res) {
    userController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function(req, res) {
    userController.show(req, res);
});

/*
 * POST
 */
router.post('/signup', function(req, res, next) {
    userController.signup(req, res);
});

/*
 * PUT
 */
router.put('/:id', function(req, res) {
    userController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function(req, res) {
    userController.remove(req, res);
});

module.exports = router;
