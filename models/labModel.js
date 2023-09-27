const mongoose = require('mongoose')

const labSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    address:{
        type:String
    },
    opening_hours:{
        type:String
    },
    cities:[{
        city_name:{
            type:String
        },
        branches:[{
            name:{
                type:String
            }
        }]
    }],
    discount:{
        type:Number
    },
    // patient_data:[{
    //     patient_name:{
    //         type:String
    //     },
    //     patient_number:{
    //         type:String
    //     },
    // }],

})

module.exports = mongoose.model("Lab",labSchema)