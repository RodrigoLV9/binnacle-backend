const express=require('express')
const binnacleRoutes=express.Router()
const Binnacle=require('../models/Binnacle')
const User=require('../models/User')

binnacleRoutes.get('/',async(req,res)=>{
    const {id}=req.query
    if(id){
        const binnacles=await Binnacle.find({idUser:id})
        res.status(200).json(binnacles)
    }else{
        res.status(400).json({error:'Not date or description or idUser'})
    }
})
binnacleRoutes.post('/',async(req,res)=>{
    const {date,description,idUser}=req.body
    if(date || description){
        await new Binnacle({date:date,description:description,idUser:idUser}).save()
        const binnacles=await Binnacle.find({idUser:idUser})
        res.status(200).json(binnacles)
    }else{
        res.status(400).json({error:'Not date or description'})
    }
    
})
binnacleRoutes.put('/',async(req,res)=>{
    const {id}=req.query
    const {date,description,idUser}=req.body
    if(id,date,description,idUser){
        await Binnacle.findOneAndUpdate({_id:id},{date:date,description:description,idUser:idUser})
        const binnacles=await Binnacle.find({idUser:idUser})
        res.status(200).json(binnacles)
    }else{
        res.status(400).json({error:'Not id or date or description or idUser'})
    }
})
binnacleRoutes.delete('/:iduser',async(req,res)=>{
    const {iduser}=req.params
    const {id}=req.query
    if(id){
        await Binnacle.findOneAndDelete({_id:id})
        const binnacles=await Binnacle.find({idUser:iduser})
        res.status(200).json(binnacles)
    }else{
        res.status(400).json({error:'Not id'})
    }
})
module.exports=binnacleRoutes