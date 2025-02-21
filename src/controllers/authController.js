const getUserInfo = require('../lib/getUserInfo');
const User = require('../models/User');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({
            error: 'Missing fields to fill in'
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
            idUser:user._id
        });
        const accessToken=await newUser.createAccessToken()
        const refreshToken=await newUser.createRefreshToken()
        await newUser.save();
        res.status(201).json({ message: "Usuario agregado con éxito", user: getUserInfo(newUser), accessToken:accessToken,
        refreshToken:refreshToken
         });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
    }
};

const login = async(req, res) => {
    const {username,password}=req.body
    const user=await User.findOne({user_name:username})
    if(!username || !password){
        res.status(400).json({error:'Missing fields to fill in'})
    }else{
        if(user){
            const correctPassword=await user.comparePassword(password,user.password)
            if(correctPassword){
                const accessToken=await user.createAccessToken()
                const refreshToken=await user.createRefreshToken()
                res.status(200).json({user:getUserInfo(user),accessToken,refreshToken})
            }else{
                res.status(400).json({error:'User or password is incorrect'})
            }
        }else{
            res.status(400).json({error:'User not found'})
        }
    }
};

module.exports = { register, login };
