const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const {authmiddlware} = require('./middleware')
const {Usermodel , Todomodel} = require("./models");
const { default: mongoose } = require('mongoose');
mongoose.connect("REDACTED")
// we will have 4 endpoints here 
//now the last 2 shoull be guided by the middleware 

app.use(express.json());

app.post("/signup", async function(req,res){
const username = req.body.username;
const password = req.body.password;
await Usermodel.create({
    username : username,
    password : password
})

res.json({
    msg : "The signup is succesfull",
})
})

app.post("/signin", async function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  const response = await Usermodel.findOne({
    username : username ,
    password  : password
  })
  if(!response){
    res.status(403).json({
        msg : "The credetials are wrong"
    })
    return;
  }
  const token = jwt.sign({
    id  : response._id.toString(), // why??
  },"REDACTED")

  res.json({
    token,
})

})


app.post("/todos", authmiddlware, async function(req,res){
const userId = req.userId;
const title = req.body.title;
const description = req.body.description;
 await Todomodel.create({
    title : title ,
    description : description,
    done  : false,
    userId : userId
})

res.json({
    msg : "The todo is added succesfully !"
})

})




app.delete("/todo", authmiddlware,function(req,res){
const userId = req.userId;
const todoid = parseInt(req.query.id);
const todoexist = TODOS.find(t=>t.id===todoid && t.userId===userId);
if(!todoexist){
     res.status(403).json({
        msg: "This todo does not exist",
    })
    return;

}
TODOS = TODOS.filter(todo=>todo.id!=todoid);
res.json({
    id : todoid,
    Deleted_todo : todoexist,
    msg : "This todo is succesfully deleted !"
})
})

app.get("/todos", authmiddlware,function(req,res){
const userId = req.userId;
const usertodos = TODOS.filter(todo=>todo.userId===userId);

res.json({
    todo : usertodos
})
})
app.listen(3000);