const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Symptom = require('../models/symptomsModel')
const cloudinary = require('cloudinary')




exports.createSymptom = async (req,res,next) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
            folder: "marham-symptom-images",
            width: 150,
            crop: "scale",
        });

        const images = []

        images.push({
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        })

        req.body.images =  {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
            }
        console.log(req.body.images);
    const symptom = await Symptom.create(req.body)

    res.status(201).json({
        success:true,
        symptom
    })
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({
            success: false,
            error: "An error occurred while creating the Symptoms.",
        });
    }
}


exports.getSymptoms = async (req,res,next) => {
    
    const symptoms = await Symptom.find()
    
    res.status(200).json({
        success:true,
        symptoms
    })
}

exports.getSingleSymptom = async (req,res,next) => {
    
    const name = req.params.id;

    const symptom = await Symptom.find({ 'name': { $regex: name, $options: 'i' } });

    
    res.status(200).json({
        success:true,
        symptom
    })
}