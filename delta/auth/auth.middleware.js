const jwt = require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{
    const token= req.headers['auth'];
    console.log(token)

    if(!token){
        
        return res.status(403).json("Token requerido");
        
    }

    try {
        const decoded=jwt.verify(token, process.env.JWT_KEY)
        req.user=decoded;
        console.log(decoded);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json('Token invalido o expirado')
    }
}

module.exports= authMiddleware;