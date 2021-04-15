const jwt = require('jsonwebtoken')


function auth (req,res,next){
    const token =req.header('x-auth-token')
    if(!token) return res.status(401).send("Un-Authenticated User")

    try{
        const user=jwt.verify(token,"secretJwtPrivateKey_Fatmug")
        req.user=user
        next()
    }
    catch(err){
        res.status(400).send("Invalid Token")
    }
}

module.exports = auth