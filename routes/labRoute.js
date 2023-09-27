const express = require('express')
const { getLabs, createLab, updateLab, deleteLab, getSingleLab } = require('../controllers/labController')

const router = express.Router()

router.route('/lab').get(getLabs)
router.route('/lab/new').post(createLab)
router.route('/lab/:id').put(updateLab).delete(deleteLab).get(getSingleLab)

module.exports = router