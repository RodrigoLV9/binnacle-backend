const express=require('express')
const binnacleRoutes=express.Router()
binnacleRoutes.get('/',(req,res)=>{
    res.send('binnacle')
})