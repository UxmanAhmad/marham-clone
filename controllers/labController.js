const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Lab = require('../models/labModel')

//ADD Lab
// exports.createLab = catchAsyncError(async (req,res,next) => {
    
//     const lab = await Lab.create(req.body)
    
//     res.status(201).json({
//         success:true,
//         lab
//     })
// })

exports.createLab = async (req,res,next) => {
    
    const lab = await Lab.create(req.body)
    
    res.status(201).json({
        success:true,
        lab
    })
}

//Get ALL Labs
// exports.getLab = catchAsyncError(async (req,res) => {
    
//     const labs = await Lab.find()
    
//     res.status(200).json({
//         success:true,
//         labs
//     })
// })


exports.getLabs = async (req,res,next) => {
    
    const labs = await Lab.find()
    
    res.status(200).json({
        success:true,
        labs
    })
}

//Get Single Labs
exports.getSingleLab = async (req,res,next) => {
    
    // const lab = await Lab.findById(req.params.id)
    
    const city = req.params.id;

    console.log(`You searched via ${city} city`);

    const lab = await Lab.find({ 'cities.city_name': { $regex: city, $options: 'i' } });
    const count = lab.length;
    if(!lab){
        return next(
            new ErrorHandler(`Lab Doesnot Exist with ID: ${req.params.id}`,404)
        )
    }

    const lab_branches = lab.branches.name
    console.log(lab_branches);

    res.status(200).json({
            success:true,
            lab,
            Total : count
        })
    
}


//Update Single Lab
exports.updateLab = async (req,res, next) => {
    
    let lab = await Lab.findById(req.params.id)
    
    if(!lab){
        return next(
            new ErrorHandler(`Lab Doesnot Exist with ID: ${req.params.id}`,404)
        )
    }

    lab = await Lab.findByIdAndUpdate(req.params.id, req.body,
                                        {
                                            new:true,
                                            runValidators:true,
                                            useFindAndModify:false
                                        }) 

    res.status(200).json({
        success:true,
        lab
    })
}

//Delete Lab
exports.deleteLab = async (req,res, next) => {
    
    const lab = await Lab.findByIdAndDelete(req.params.id)
    
    if(!lab){
        return next(
            new ErrorHandler(`Lab Doesnot Exist with ID: ${req.params.id}`,404)
        )
    }

    // await Lab.remove() 
    else{
        res.status(200).json({
            success:true,    
            message:"Lab Deleted Successfully"
        })
    }
}

//Get Single Labs
exports.getlabbycity = async (req,res,next) => {
    
    // const lab = await Lab.findById(req.params.id)
    
    const city = req.body.city;

    console.log(city);

    let lab = await Lab.find({ 'cities[0].city_name': { $regex: city, $options: 'i' }  });
    // const lab = await Lab.find({ city,fee });
    const count = lab.length;

    if(!lab){
        return next(
            new ErrorHandler(`Lab Doesnot Exist with ID: ${req.body.city}`,404)
        )
    }

    const lab_branches = lab.branches.name
    console.log(lab_branches);
    // lab = await Lab.find({ 'branches.name': { $regex: city, $options: 'i' }  });


            res.status(200).json({
            success:true,
            lab,
            Total : count
    
    })
    
}
