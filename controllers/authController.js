const User = require('../models/User');
const jwt =  require ("jsonwebtoken");
const bcrypt = require('bcryptjs');

module.exports.register = async (req,res,next)=>{
    console.log(req.body);
    console.log("-------from register------");
        try {
            const test = await User.findOne({email: req.body.email});
    
            if(test){
                const err = new Error('Email is existed');
                err.statusCode = 400;
                return next(err)
            }
            const user = await User.create(req.body);
            const token = jwt.sign({userId: user._id});
            res.status(200).json({
                status: 'success',
                data: { token, userName: user.name }
            });
        } catch (error) {
            
           res.json(error);
        }
}

module.exports.login = async (req,res,next)=>{
        console.log(req.body);
        console.log("------email- pasword-------");
        try {
            const user = await User.findOne({email: req.body.email});
            
            if(!user){
                    //err Email is not correct
                const err = new Error('Email is not correct');
                err.statusCode = 400;
                return next(err)
            }
            
            if (bcrypt.compareSync(req.body.password, user.password)){
                console.log('=++++++++');
                console.log(user);
                res.status(200).json({name: user.name})

                // const token = jwt.sign({userId: user._id}, process.env.APP_SECRET); 

                
                // res.status(200).json({
                //     status: 'success',
                //     data: { token, userName: user.name }
                // })
            }else {
                const err = new Error('Password is not correct');
                err.statusCode = 400;
                return next(err)
            }
                
        } catch (error) {
            res.json( error);
        }  
    } 

//get curren tuser
exports.getCurrentUser = async (req,res,next) => {
    try {
        const data = {user: null }
        if (req.user) {
            const user = await User.findOne({ _id: req.user.userId});
            data.user = { username: user.name }
        }
        res.status(200).json({
            status: 'success',
            data: data
        })

    } catch (error) {
        res.json(error)
    }
}