const express=require('express')
const binnacleRoutes=express.Router()
const Binnacle=require('../models/Binnacle')
const User=require('../models/User')
const task=
    [
        {
            description:'Programe 5hs en mi proyecto de binnacle',
            date:'15/02/2025'
        },
        {
            description:'Hice ejercicio 2hs y programe 6hs aparte de limpiar la casa',
            date:'16/02/2025'
        }
    ]

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
        const newBinnacle=await new Binnacle({date:date,description:description,idUser:idUser}).save()
        res.status(200).json({
            date:newBinnacle.date,
            description:newBinnacle.description,
            idUser:newBinnacle.idUser
        })
    }else{
        res.status(400).json({error:'Not date or description'})
    }
    
})
module.exports=binnacleRoutes