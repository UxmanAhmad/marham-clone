const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const errorMiddleware = require('./middleware/error')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')


//Config
// dotenv.config({path:"backend/config/config.env"})



app.use(cors());
app.use(express.json())
app.use(bodyParser.json({limit: '35mb'}));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '35mb',
        parameterLimit: 50000,
    }),
);

//Routes
const doctorRoute = require('./routes/doctorRoute')
const hospitalRoute = require('./routes/hospitalRoute')
const labRoute = require('./routes/labRoute')
const symptomRoute = require('./routes/symptomRoute')
const diseaseRoute = require('./routes/diseaseRoute')
const userRoute = require('./routes/userRouter')
const postRoute = require('./routes/postRoute')
const doctorAppointmentRoute = require('./routes/Admin/doctorAppointmentRoute')


app.use('/api/v1',doctorRoute)
app.use('/api/v1',hospitalRoute)
app.use('/api/v1',labRoute)
app.use('/api/v1',symptomRoute)
app.use('/api/v1',diseaseRoute)
app.use('/api/v1',userRoute)
app.use('/api/v1',postRoute)
app.use('/api/v1',doctorAppointmentRoute)





app.use(errorMiddleware)

module.exports = app