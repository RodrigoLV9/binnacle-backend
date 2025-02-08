const User = require('../models/User');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const task = [];

    if (!username || !email || !password) {
        res.status(400).json({
            error: 'Faltan campos por rellenar'
        });
        return;
    }

    try {
        const user=new User()
        const exist=await user.userNameExist(username)
        if(exist){
            return res.status(400).json({error:'Username already exist'})
        }
        const newUser = new User({
            user_name: username,
            email: email,
            password: password,
            task: task
        });
        await newUser.save();
        res.status(201).json({ message: "Usuario agregado con éxito", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
    }
};

const login = (req, res) => {
    res.send('Login');
};

module.exports = { register, login };
