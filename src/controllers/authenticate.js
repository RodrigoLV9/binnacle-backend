const getTokenFromHeaders = require("../lib/getTokenFromHeaders")
const { verifyAccessToken } = require("../lib/verifyTokens")

const authenticate=(req,res,next)=>{
    const token=getTokenFromHeaders(req.headers)
    if(token){
        const decoded=verifyAccessToken(token)
        if(decoded){
            req.user={...decoded.user}
            next()
        }else{
            res.status(400).json({error:'Not authorization'})
        }
    }else{
        res.status(400).json({error:'Not token provided'})
    }
}
module.exports=authenticate