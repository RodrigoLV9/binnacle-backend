const express=require('express')
const binnacleRoutes=express.Router()
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

binnacleRoutes.get('/',(req,res)=>{
    res.send(task)
})

module.exports=binnacleRoutes