const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const {Schema} = mongoose;
const userSchema = new Schema({
    name:{
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Name must be required']
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Email must be required']
    },
    password:{
        type: String,
        trim: true,
        required: [true, 'Password must be required'],
        minlength: [6, 'Password must be at least 6 character']
    },
},
{timestamps: true})

userSchema.pre('save',function(next) {
    let user = this ;
    bcrypt.hash(user.password,10,function(error,hash){
        if(error){
            return next(error);
        }else{
            user.password = hash;
            next()
        }
    })
})

module.exports = mongoose.model('User', userSchema)
