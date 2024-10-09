var jwt = require("jsonwebtoken");
const fetchUser=(req,res,next)=>{
    // Get User from Jwt token And userid to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Authenticate Using a valid Token"});
    }
    try {
        const data=jwt.verify(token,"JWT_Secrete");
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please Authenticate Using a valid Token"});
    }
}
module.exports=fetchUser;