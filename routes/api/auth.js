const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const User = require('../../models/usermodel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/',auth, async(req,res)=>{
   
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)

    }catch(e){
        console.error(e);
        res.status(500).send('Server Token')
    }

});

router.post('/',async (req,res)=>{

    const{email,password}= req.body;

    try{

        let user = await User.findOne({email});

        if(!user){
            return res.status(401).json({errors: [{msg: 'Invalid email or password'}]})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({errors: [{msg: 'Invalid email or password'}]})
        }

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



module.exports= router