const jwt = require("jsonwebtoken");
function authmiddlware(req,res,next){
    const token = req.headers.token;
    if(!token){
        res.status(403).json({
            msg : "Pls send us the token"
    })
    return;
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    const userId = decode.id;

    if(!userId){ // it just check the value is falsy or not ( like undefined , o )
        res.status(403).json({
            msg: "The token was not correct!"
        })
        return;
    }
    req.userId = userId;
    next();
}
module.exports = {
    authmiddlware : authmiddlware
}