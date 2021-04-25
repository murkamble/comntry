const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = ( req, res) => {
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



exports.signin = ( req, res) => {
    User.findOne({ email: req.body.email })
        .exec(async(error, user) => {
            if (error) res.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SCRETE, { expiresIn: '1h' });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({
                        token: token,
                        user: { _id, firstName, lastName, email, role, fullName }
                    });
                }else{
                    res.status(400).json({ message: 'Invalid Password.' })
                }
            }else{
                return res.status(400).json({ message: 'Something went wrong.' });
            }
        });
}


// exports.requireSignin = ( req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     const user = jwt.verify( token, process.env.JWT_SCRETE);
//     req.user = user;
//     next();
// }