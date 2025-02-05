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
server.use(cors());
server.use(express.json());

mongoose.connect(`mongodb+srv://rodrigolv975:${password}@cluster0.rzn78.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{})
    .then(()=>console.log('Conectado a la base de datos correctamente'))
    .catch(err=>console.log('Error en la base de datos: ',err))

server.get('/api',async(req,res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
})
server.post("/api/add", async (req, res) => {
    try {
        const { user_id, user_name, email, password, task } = req.body;

        // Crear un nuevo usuario con tareas
        const newUser = new User({
            user_id,
            user_name,
            email,
            password,
            task
        });

        await newUser.save(); // Guardar en MongoDB
        res.status(201).json({ message: "Usuario agregado con éxito", user: newUser });

    } catch (error) {
        console.error("Error al agregar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
server.get('/api/data',(req,res)=>{
    res.send(exampleData)
})
server.use('/api',authRoutes)
server.listen(PORT,()=>{
    console.log(`Server running in port:${PORT}`)
})

