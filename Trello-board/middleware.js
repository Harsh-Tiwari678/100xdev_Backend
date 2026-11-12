const jwt = require('jsonwebtoken');

function Authmiddleware(req,res,next){
const token = req.headers.token;
const decode = jwt.verify(token , 'harsh1234');
const userId = decode.userId;
if(userId){
    req.userId = userId
    next();
}
else{
    res.status(403).json({
        msg : "the token was incorrect"
    })
}


}

module.exports = {
    Authmiddleware : Authmiddleware
}