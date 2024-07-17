const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");
const auth = require("../middleware/authorization");
const User = require("../models/User");



router.get("/", auth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Server error");
    }
});


router.post(
    "/",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const {email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid username or password" }] });
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid username or password" }] });
            }
             
            const payload = {
                user: {
                    id: user.id,
                }
            };

            jwt.sign(
                payload, //user id is stored in token
                config.jwtSecret, 
                { expiresIn: 3600 * 24 }, 
                (err, token) => {
                    if(err) throw err;
                    res.json({token});
                }
            );

            //res.send("User created");
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    });



module.exports = router;