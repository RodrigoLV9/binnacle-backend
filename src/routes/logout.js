const express=require('express')
const getTokenFromHeaders = require('../lib/getTokenFromHeaders')
const logoutRoutes=express.Router()
const Token=require('../models/token')
logoutRoutes.delete('/',(req,res)=>{
    const refreshToken=getTokenFromHeaders(req.headers)
    try{
        Token.findOneAndDelete({refreshToken:refreshToken})
        res.status(200).json({message:'Logout success'})
    }catch(err){
        res.status(500).json({error:'Error in logout backend'})
    }
})
module.exports=logoutRoutes