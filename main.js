const express=require('express');
const server=express();
require('dotenv').config();
const PORT=process.env.PORT;
const mongoose=require('mongoose')
const password=process.env.PASSWORD;
const authRoutes=require('./src/routes/auth.routes')
const exampleData=require('./src/data/example')
const User=require('./src/models/User')
const cors=require('cors')
const refreshTokenRoutes=require('./src/routes/refreshToken');
const userRoutes = require('./src/routes/user.routes');
const authenticate=require('./src/controllers/authenticate');
const binnacleRoutes = require('./src/routes/binnacle.routes');
const logoutRoutes = require('./src/routes/logout');
server.use(cors());
server.use(express.json());

mongoose.connect(`mongodb+srv://rodrigolv975:${password}@cluster0.rzn78.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{})
    .then(()=>console.log('Conectado a la base de datos correctamente'))
    .catch(err=>console.log('Error en la base de datos: ',err))

server.get('/',(req,res)=>{
    res.status(200).send('Pagina principal')
})
server.get('/api',async(req,res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
})
server.get('/api/data',(req,res)=>{
    res.send(exampleData)
})
server.use('/api',authRoutes)
server.use('/api/refresh-token',refreshTokenRoutes)
server.use('/api/user',authenticate,userRoutes)
server.use('/api/binnacle',authenticate,binnacleRoutes)
server.use('/api/logout',logoutRoutes)
server.listen(PORT,()=>{
    console.log(`Server running in port:${PORT}`)
})

