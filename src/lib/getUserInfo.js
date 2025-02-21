const getUserInfo=(user)=>{
    return {
        username:user.user_name,
        email:user.email,
        idUser:user._id
    }
}
module.exports=getUserInfo