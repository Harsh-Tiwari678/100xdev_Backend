const express = require('express');
const app = express();

// we will have 4 endpoints here 
//now the last 2 shoull be guided by the middleware 


app.post("/signup", function(req,res){

})

app.post("/signin", function(req,res){
    
})

app.post("/todos", function(req,res){
const title = req.body.title;
const description = req.body.description;

})

app.delete("/todo",function(req,res){

})

app.get("/todos", function(req,res){
    
})
app.listen(3000);