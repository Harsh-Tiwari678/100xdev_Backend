//We are gonna make a Http server which have these 4 routes 
//  /add 
//  /multiply
//  /divide
//  /substract 

// for this there are many frameworks that we can use -- like Express , hono , elysiajs , trpc .... but we are gonna use Express

const express = require('express');
const path   =  require('path')
const app = express(); //means we are creating a new http server or 1 htttp server 

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname,"index.html"))
})

http://localhost:3002/sum?a=1&b=3
// app.get("/add" , function(req,res){
// const a = parseInt(req.query.a); // but this will be a string , we have to convert it .. using the parse int 
// const b = parseInt(req.query.b);
// const sum = a+b ;

//now how to send ? 

//sending plain text -----
// res.send(sum.toString());

//sending< html -------
// res.send("<b><i>" +sum + "</i></b>")

//Now if the users send the request as the path parameters eg - /sum/1/100
app.get("/sum/:a/:b",function(req,res){
const a = parseInt(req.params.a);
const b  = parseInt(req.params.b);

const sum =  a+b;


// sending json -----
res.json({   
ans : sum
})
})





app.get("/sub/:a/:b",function(req,res){
    const a  = parseInt(req.params.a);
    const b =  parseInt(req.params.b);

    const sub  =  a-b;

    res.json({
    ans : sub
    })

});
app.get("/mul/:a/:b",function(req,res){

  const a  = parseInt(req.params.a);
    const b =  parseInt(req.params.b);

    const mul  =  a*b;

    res.json({
    ans : mul
    })
})
app.get("/div/:a/:b",function(req,res){

  const a  = parseInt(req.params.a);
    const b =  parseInt(req.params.b);

    const div  =  a/b;

    res.json({
    ans : div
    })
})

app.listen(3000)