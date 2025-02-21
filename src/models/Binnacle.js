const mongoose=require('mongoose')

const BinnacleSchema=new mongoose.Schema({
    date:String,
    description:String,
    idUser:String
})
module.exports=mongoose.model('Binnacle',BinnacleSchema)