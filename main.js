const express=require('express');
const server=express();
require('dotenv').config();
const PORT=process.env.PORT;
server.get('/',(req,res)=>{
    res.send('Hello World');
})
server.listen(PORT,()=>{
    console.log(`Server running in port:${PORT}`)
})