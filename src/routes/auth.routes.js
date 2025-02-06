const express=require('express')
const authRouter=express.Router()
const {register,login}=require('../controllers/authController')
authRouter.post('/register',register)
authRouter.get('/login',login)

module.exports=authRouter