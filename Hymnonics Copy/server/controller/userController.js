const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.SignUp = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.json({
                success: false,
                message: 'Please fill all details carefully.'
            });
        }

        const userexist = await User.findOne({email});

        if(userexist){
            return res.json({
                success: false,
                message: 'User already exist.'
            });
        }

        let HashPass;
        try {
            HashPass = await bcrypt.hash(password, 10);
        } catch (error) {
            console.error(error);
            return res.json({
                success: false,
                message: 'Error in hashing password.'
            })
        }

        const user = await User.create({
            name, password: HashPass, email
        })

        res.json({
            success: true,
            message: 'User created successfully.'
        });

    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: 'User not created.'
        }) 
    }
}


exports.Login = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({
                success: false,
                message: 'Please fill all details carefully.'
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.json({
                success: false,
                message: 'User is not registered.'
            })
        }

        const payload = {
            email: user.email,
            role: user.role,
            id: user._id
        };

        if(await bcrypt.compare(password, user.password)){
            
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '2h'});

            user.password = undefined;

            res.json({
                success: true,
                token,
                user: user.name,
                message: 'User logged in successfully.'
            })
        }
        else{
            return res.json({
                success: false,
                message: 'Incorrect Password.'
            }) 
        }

    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: 'User not logged in.'
        }) 
    }
}