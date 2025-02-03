const express=require('express')
const authRouter=express.Router()
const {register,login}=require('../controllers/authController')
authRouter.get('/register',register)
authRouter.get('/login',login)

module.exports=authRouter