const express = require('express')
const { createHospital, getHospitals, updateHospital, deleteHospital, getSingleHospital } = require('../controllers/hospitalController')

const router = express.Router()

router.route('/hospital').get(getHospitals)
router.route('/hospital/new').post(createHospital)
router.route('/hospital/:id').put(updateHospital).delete(deleteHospital).get(getSingleHospital)

module.exports = router