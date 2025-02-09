const jwt=require('jsonwebtoken')
const accessToken=process.env.ACCESS_TOKEN_SECRET
const refreshToken=process.env.REFRESH_TOKEN_SECRET
const sign=(payload,isAccessToken)=>{
    return jwt.sign(payload, isAccessToken ? accessToken : refreshToken,{
        algorithm:'HS256',
        expiresIn:3600
    })
}
const generateAccessToken=(user)=>{
    return sign({user},true)
}
const generateRefreshToken=(user)=>{
    return sign({user},false)
}
module.exports ={generateAccessToken, generateRefreshToken}