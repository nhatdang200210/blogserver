const jwt = require('jsonwebtoken');

exports.verifyToken = (req,res,next)=>{

    const Authorization = req.header('authorization');

    if(!Authorization){
        //err
    }

    //GET TOKEN
    const token = Authorization.replace('Bearer ','')

    //verify token
    const {userId} = jwt.verify(token, process.env.APP_SECRET);

    req.user = {userId};
    next();
}