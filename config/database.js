const mongoose = require('mongoose')




const connectDatabase = () => {

    mongoose.connect(process.env.MONGO_URL,
                    {
                        useNewUrlParser:true,
                        useUnifiedTopology:true
                    }
                    ).then((data) => {
                        console.log(`Successfully connected to database at Server : ${data.connection.host}`);
                    }).catch(err => {
                        console.log(`Error connecting to database: ${err.message}`);
                    })

}

module.exports = connectDatabase