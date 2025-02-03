const express=require('express');
const server=express();
require('dotenv').config();
const PORT=process.env.PORT;
const mongoose=require('mongoose')
const password=process.env.PASSWORD;
const authRoutes=require('./src/routes/auth.routes')
mongoose.connect(`mongodb+srv://rodrigolv975:${password}@cluster0.rzn78.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{})

server.get('/api',(req,res)=>{
    res.send('Hello World');
})
server.use('/api',authRoutes)
server.listen(PORT,()=>{
    console.log(`Server running in port:${PORT}`)
})