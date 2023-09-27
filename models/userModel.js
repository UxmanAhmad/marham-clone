const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    number : {
        type: String,
        required: [true,"Please Enter Your Number"],
        unique: true,
    }
},
    {
        timestamps: true
    }
)


// name : {
//     type: String,
//     required: [true,"Please Enter Your Name"],
//     maxLength: [30,"Name Cannot Exceed 30 Letters"],
//     minLength: [4,"Name Cannot less 4 Letters"]
// },






//JWT Token
userSchema.methods.getJWTToken = function () {
    const token = jwt.sign({ 
        id : this._id,
        number: this.number 
    } , process.env.JWT_SECRET_KEY , {
        expiresIn: process.env.JWT_EXPIRE_KEY
    })
    return token
}







module.exports = mongoose.model('User', userSchema)