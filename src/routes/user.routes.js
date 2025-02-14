const express=require('express')
const getTokenFromHeaders = require('../lib/getTokenFromHeaders')
const { verifyAccessToken } = require('../lib/verifyTokens')
const userRoutes=express.Router()

const authenticate=(req,res,next)=>{
    const token=getTokenFromHeaders(req.headers)
    if(token){
        const decoded=verifyAccessToken(token)
        if(decoded){
            req.user={...decoded.user}
            next()
        }else{
            res.status(400).json({message:"No token provided 1"})
        }
    }else{
        res.status(400).json({message:"No token provided 2"})
    }
}
userRoutes.get('/',authenticate,(req,res)=>{
    res.status(200).json({status:200,body:req.user})
})

module.exports=userRoutes