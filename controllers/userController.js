var User = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function(req, res) {
        User.find(function(err, users){
            if(err) {
                return res.json(500, {
                    message: 'Error getting user.'
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function(req, res) {
        var id = req.params.id;
        User.findOne({_id: id}, function(err, user){
            if(err) {
                return res.json(500, {
                    message: 'Error getting user.'
                });
            }
            if(!user) {
                return res.json(404, {
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function(req, res) {
        var user = new User({
			email : req.body.email,
			password : req.body.password
        });

        user.save(function(err, user){
            if(err) {
                return res.json(500, {
                    message: 'Error saving user',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: user._id
            });
        });
    },

    /**
     * userController.update()
     */
    update: function(req, res) {
        var id = req.params.id;
        User.findOne({_id: id}, function(err, user){
            if(err) {
                return res.json(500, {
                    message: 'Error saving user',
                    error: err
                });
            }
            if(!user) {
                return res.json(404, {
                    message: 'No such user'
                });
            }

            user.email =  req.body.email ? req.body.email : user.email;
			user.password =  req.body.password ? req.body.password : user.password;
            user.save(function(err, user){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting user.'
                    });
                }
                if(!user) {
                    return res.json(404, {
                        message: 'No such user'
                    });
                }
                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function(req, res) {
        var id = req.params.id;
        User.findByIdAndRemove(id, function(err, user){
            if(err) {
                return res.json(500, {
                    message: 'Error getting user.'
                });
            }
            return res.json(user);
        });
    },

    signup: function(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(422).send({error: 'You must provide email and password'})
        }
        // See if a user with the given email exists
        User.findOne({ email: email }, function (err, existingUser) {
            if(err) return next(err);

            // If a user with  does exist, return an error
            if (existingUser) {
                return res.status(422).send({ error: 'Email is in use' });
            }

            // If a user with  does NOT exist, create and save user record
            const user = new User({
                email: email,
                password: password
            });

            user.save(function(err) {
                if (err) return next(err);
            });

            // Respond to request indicting the user was created
            res.json({ success: true });
        });


    }
};
