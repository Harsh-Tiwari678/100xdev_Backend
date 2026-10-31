const jwt = require('jsonwebtoken');
function Authenticate(req,res,next){
    const token = req.headers.token;
        if(!token){
            res.status(403).json({
                message: "You are not logged in"
            })
            return;
        }
    
        const decode = jwt.verify(token , 'harsh123')
        const username = decode.username;  // -> 
    
        if(!username){
            res.status(403).json({
                message: "The token is maloformed ! "
            })
            return;
        }

        req.username = username;

            next();
        }

        module.exports ={
         Authenticate
        } 