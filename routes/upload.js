const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCtrl = require('../controllers/uploadCtrl') // these routes are important keep an eye on them 
const auth = require('../middleware/auth') //cautious of the quotation and identifer 


//route upload avatar 
router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)

module.exports = router