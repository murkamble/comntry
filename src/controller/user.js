const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.signup = ( req, res) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email })
        .exec(async(error, user) => {
            if (user) {
                return res.status(400).json({
                    message: 'User already registered...'
                });
            }
            const { firstName, lastName, email, password } = req.body;
            const hash_password = await bcrypt.hash(password, 10);
            const _user = new User({ 
                firstName, 
                lastName, 
                email, 
                hash_password, 
                // username: shortid.generate()
                username: Math.random().toString(),
            });
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Something went wrong...'
                    })
                }
                if (data) {
                    return res.status(201).json({
                        message: 'User create successfully...!'
                    })
                }
            })
        })
}