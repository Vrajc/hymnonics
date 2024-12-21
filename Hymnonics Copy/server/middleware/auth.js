const jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema');
require('dotenv').config();

exports.auth = async(req, res, next) => {
    try {
       const token = req.params.token;
       
       if(!token){
        res.json({
            success: false,
            message: "Token Missing."
        })
       }

       try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;

       } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Invalid Token."
        })
       }
       
       next();
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Something Went Wrong While Verifing User."
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        const role = req.user.role;

        if(role !== "Admin"){
            return res.json({
                success: true,
                isAdmin: false
            })
        }
        next();
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Something Went Wrong While Checking Role."
        })
    }
}