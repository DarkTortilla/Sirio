const jwt = require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{
    const token= req.headers['auth'];

    if(!token){
        res.status(403).json("Token requerido");
    }

    try {
        cosnt =jwt.verify(token.split(' ')[1], process.env.JWT_KEY)
        req.user=decoded;
        next();
    } catch (error) {
        console.log('error');
        res.status(401).json('Token invalido o expirado')
    }
}

module.exports= authMiddleware;