module.exports= (req, res,next)=>{
    const jwt=require('jsonwebtoken')
    const token=req.headers.authorization.split(' ')[1];
try {
   if (!token){
        const error=res.status(401).send({msg:"Authorization failed"})
    }  
let decodedToken=jwt.verify(token,'supersecret');
req.userData={userId:decodedToken.userId};
next();
} catch (error) {
    const err=res.status(401).send({msg:"Authorization failed"})
     return next(err);
}
   
}