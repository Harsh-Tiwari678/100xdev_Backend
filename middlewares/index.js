// const express  = require('express');
// const app = express();

// app.get('/healthcheckup', function(req,res){
//     const kidneyid   = req.query.kidneyid;
//     const username =   req.headers.username;
//     const password =  req.headers.password;

// if(username!="Harsh" || password!="Pass"){
//     res.status(403).json({
//         msg: "User does not exist",
//     })
//     return; //early return 

// }

// if(kidneyid!=1 && kidneyid!=2){
//     res.status(411).json({
//         msg: "Wrong inputs",
        
//     })
//     return;
// }

// res.send("All things work perfectly fine")

// });

// app.listen(3002);

// The above code is the dumb way of doing it the Auth check and the input validation 


// The cleaner solution with the middlewares !!!!!
const express  = require('express');
const app = express();

function userAuthMiddleware(req,res,next){
    const username =   req.headers.username;
    const password =  req.headers.password;
    if(username!="Harsh" || password!="Pass"){
        res.status(403).json({
            msg: "User does not exist",
        })
    }
    else{
        next();
    }

};

function inputMiddleware(req,res,next){
    const kidneyid   = req.query.kidneyid;
if(kidneyid !=1 && kidneyid != 2){
    res.status(411).json({
        msg: "The inputs are not correct!"
    })
}
else{
    next();
}
}

app.get('/healthcheckup', userAuthMiddleware,inputMiddleware,function(req,res){
    
    
    res.send("Everything works here !!");
})
app.listen(30002);