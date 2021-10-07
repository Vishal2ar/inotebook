var jwt = require('jsonwebtoken'); 
const  JWT_S =  "Apple@12isThepassCode";

const fetchUser = async (req,res,next) => {
    const token = req.header("auth-token");
    if (!token)
        {res.status(401).send({error : "Access Denied 1"})}
    try {
        const data = await jwt.verify(token,JWT_S);
        req.user = data.id
        // console.log(data.id);
        // console.log(req.user);
  
    next();
    } catch (error) {
        res.status(401).send({error : "Access Denied 2"})
    }
}

module.exports = fetchUser