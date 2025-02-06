const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const taskSchema=new mongoose.Schema({
    id_task:String,
    date:String,
    description:String,
})
const UserSchema=new mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
    task: [taskSchema],
})
UserSchema.pre('save',function(next){
    if(this.isModified || this.isNew){
        const document=this
        bcrypt.hash(document.password,10,(err,hash)=>{
            if(err){
                next(err)
            }else{
                document.password=hash
                next()
            }
        })
    }else{
        next()
    }
})
const User = mongoose.model("User", UserSchema);
module.exports=User