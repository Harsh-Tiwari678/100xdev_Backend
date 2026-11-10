const express = require ('express');
const app = express();


let  count = 0 ;

function Middleware(req,res,next){ 
    const timestamp   =  new Date().toISOString()  
   console.log(`${timestamp}, ${req.url} , ${req.method}`)
}

app.get("/sum", Middleware, function(req,res){
    const a = parseInt(req.query.a);
     const b = parseInt(req.query.b);
     const sum = a+b;
     res.json({
        answer : sum,
     })
})
app.get("/request",Middleware,function(req,res){
    res.json({
        totalRequest: count,
    })
})
app.listen(3000);