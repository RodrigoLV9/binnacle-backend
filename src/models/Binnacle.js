const mongoose=require('mongoose')

const BinnacleSchema=new mongoose.Schema({
    id:String,
    title:String,
    descriptcion:String,
    id_user:String
})
module.exports=mongoose.model('Binnacle',BinnacleSchema)