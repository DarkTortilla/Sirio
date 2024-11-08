const roleMiddleware = (requiredRole)=>{
    return (req, res, next)=>{
        const user= req.user;
        if (user && user.role === requiredRole) {
            next();    
        }
        else{
            return res.status(403).json("Qué demonios de te pasa pervertido?, Qué no sabes leer?")
        }
    }
} 
