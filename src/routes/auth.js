const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controller/auth')

router.post('/signin', signin)
router.post('/signup', signup)

// router.post('/profile', requireSignin, ( req, res) => {
//     res.status(200).json({ message: 'profile' })
// })

module.exports = router;