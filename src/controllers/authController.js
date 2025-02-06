const User=require('../models/User')
const register=async(req,res)=>{
    const {username,email,password}=await req.body
    const info_username=username
    const info_email=email
    const info_password=password
    const task=[]
    const newUser=new User({
        user_name:info_username,
        email:info_email,
        password:info_password,
        task:task
    })
    await newUser.save()
    res.status(201).json({ message: "Usuario agregado con éxito", user: newUser });
}
const login=(req,res)=>{
    res.send('Login')
}
module.exports={register,login}