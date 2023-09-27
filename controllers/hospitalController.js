const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Hospital = require('../models/hospitalModel')




exports.createHospital = async (req,res,next) => {
    const hospital = await Hospital.create(req.body)

    res.status(201).json({
        success:true,
        hospital
    })
}



exports.getHospitals = async (req,res,next) => {
    
    const hospitals = await Hospital.find()
    const hospitalCount = await Hospital.countDocuments()
    
    res.status(200).json({
        success:true,
        hospitals,
        hospitalCount
    })
}

//Get Single Doctors
exports.getSingleHospital = async (req,res,next) => {
    
    // const doctor = await Doctor.findById(req.params.id)
    
    const name = req.params.id;

    console.log(name);

    // Search by hospital name
    let hospital = await Hospital.find({ 'hospital.hospital_name': { $regex: name, $options: 'i' } });
    
    // if (!hospital || hospital.length === 0) {
    //   // If no hospital found by hospital name, search by disease name
    //     hospital = await Hospital.find({ 'disease.name': { $regex: name, $options: 'i' } });
    //     }

    // if (!hospital || hospital.length === 0) {
    //   // If no hospital found by hospital name, search by disease name
    //     hospital = await Hospital.find({ 'services.name': { $regex: name, $options: 'i' } });
    //     }

    if (!hospital || hospital.length === 0) {
        hospital = await Hospital.find({ 'city': { $regex: name, $options: 'i' } });
        }
    
        // if (!hospital || hospital.length === 0) {
        // // If no hospital found by disease name, search by symptoms name
        // hospital = await Hospital.find({ 'symptoms.name': { $regex: name, $options: 'i' } });
        // }
    
        // if (!hospital || hospital.length === 0) {
        // // If no hospital found by symptoms name, search by speciality
        // hospital = await Hospital.find({ 'specialities': { $regex: name, $options: 'i' } });
        // }

        if (!hospital || hospital.length === 0) {
        // If no hospital found by symptoms name, search by speciality
        hospital = await Hospital.findById(req.params.id);
        }
    
        const count = hospital.length;
    
        if (!hospital || hospital.length === 0) {
        return next(new ErrorHandler(`The Hospital You Searched Does Not Exist in: ${req.params.id}`, 404));
        }
    
        res.status(200).json({
            success:true,
            hospital,
            total : count
        })
    
}


//Update Single Hospital
exports.updateHospital = async (req,res, next) => {
    
    let hospital = await Hospital.findById(req.params.id)
    
    if(!hospital){
        return next(
            new ErrorHandler(`Hospital Doesnot Exist with ID: ${req.params.id}`,404)
        )
    }

    hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body,
                                        {
                                            new:true,
                                            runValidators:true,
                                            useFindAndModify:false
                                        }) 

    res.status(200).json({
        success:true,
        hospital
    })
}

//Delete Doctor
exports.deleteHospital = async (req,res, next) => {
    
    const hospital = await Hospital.findByIdAndDelete(req.params.id)
    
    if(!hospital){
        return next(
            new ErrorHandler(`Hospital Doesnot Exist with ID: ${req.params.id}`,404)
        )
    }

    // await Hospital.remove()
    
        res.status(200).json({
            success:true,    
            message:"Hospital Deleted Successfully"
        })
    
}

