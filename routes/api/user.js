const express = require('express');
const router = express.Router();
const User = require('../../models/usermodel');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/',async (req,res)=>{

    const{name,email,password}= req.body;

    try{
      
        const avatar= gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        let user = new User({name,email,avatar,password});

        const salt= await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
       
        const payload = {
            user:{
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'),{expiresIn: 360000},(err,token)=>{
            if(err) throw err;
            res.json({token})
        })

    }
    catch(e){
        console.log(e);
        res.status(500).send(e)
    }

})



module.exports= router;