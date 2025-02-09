const getUserInfo=(user)=>{
    return {
        username:user.user_name,
        email:user.email
    }
}
module.exports=getUserInfo