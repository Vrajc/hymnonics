const express = require('express');
const router = express.Router();

const {Login, SignUp} = require('../controller/userController');
const {auth, isAdmin} = require('../middleware/auth');

router.post('/signup', SignUp);
router.post('/login', Login);

router.get('/home/:token', auth, isAdmin, async(req, res) => (
    res.status(200).json({
        success: true,
        isAdmin: true
    })
))
module.exports = router;