const express=require('express')
const userRoutes=express.Router()

userRoutes.get('/',(req,res)=>{
    res.status(200).json({status:200,body:req.user})
})

module.exports=userRoutes