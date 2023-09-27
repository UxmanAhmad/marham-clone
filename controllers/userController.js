const bcrypt = require('bcrypt')
const _ = require('lodash')
const axios = require('axios')
const otpGenerator = require('otp-generator')
const twilio = require('twilio')


const User = require('../models/userModel')
const Otp = require('../models/otpModel')



// Initialize Twilio client
const accountSid = 'AC9f9bff5403bd0679105533ed387dde2d'
const authToken = '4635c3dbddfc4a6dfa93abc50df71c7b'
const twilioClient = twilio(accountSid, authToken)

    exports.signUp = async (req, res) => {
        const user = await User.findOne({
        number: req.body.number
        })
    
        if (user) return res.status(400).send("User Already Registered")
    
        const OTP = otpGenerator.generate(6, {
        digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        })
    
        const number = req.body.number
    
        console.log(number);
    
        console.log(OTP);
    
        const otp = new Otp({ number: number, otp: OTP })
        const salt = await bcrypt.genSalt(10)
        otp.otp = await bcrypt.hash(otp.otp, salt)
    
        const result = await otp.save()
    
        // Send SMS with Twilio
        twilioClient.messages.create({
        body: `Your OTP is ${OTP}`,
        from: 'YOUR_TWILIO_PHONE_NUMBER',
        to: number
        })
        .then(() => {
            return res.status(200).send("Otp Send Successfully")
        })
        .catch((error) => {
            console.log(error)
            return res.status(500).send("Failed to send OTP")
        })
    }



exports.verifyOtp = async ( req , res ) => {
    const otpHolder = await Otp.find({
        number: req.body.number
    })

    // console.log(otpHolder);
    // console.log(otpHolder.name);
    // console.log(otpHolder.otp);
    
    if(otpHolder.length === 0) return res.status(400).send("You use an Expired OTP!")
    const rightOtp = otpHolder[otpHolder.length - 1]
    console.log(rightOtp.otp);
    const validUser = await bcrypt.compare(req.body.otp , rightOtp.otp)
    
    const {name,number} = req.body

    if(rightOtp.number === req.body.number && validUser){
        const user = new User(_.pick(req.body,['number']))
        const token = user.getJWTToken()
        const result = await user.save()
        const OTPDelete = Otp.deleteMany({
            number: rightOtp
        })
        return res.status(200).send({
            message:"User rigistered Successfully",
            token: token,
            data: result
        })
    }
    else{
        return res.status(400).send({message:"Incorrect OTP"})
    }

} 