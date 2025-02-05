const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    id_task:String,
    date:String,
    description:String,
})
const UserSchema=new mongoose.Schema({
    user_id: Number,
    user_name: String,
    email: String,
    password: String,
    task: [taskSchema],
})
const User = mongoose.model("User", UserSchema);
module.exports=User