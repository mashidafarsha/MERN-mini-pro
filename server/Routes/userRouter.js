const express = require('express')
const router = express.Router()
const {register,login} = require('../Controller/userController')
const {updateProfile}=require('../Controller/profileController')
const { verifyLogin } = require('../Middilewares/userAuth')
const { uploadImage } = require('../Middilewares/image-upload');



router.post('/',verifyLogin)
router.post('/register',register)
router.post('/login',login)
router.post('/upload-image',uploadImage,updateProfile);



module.exports= router