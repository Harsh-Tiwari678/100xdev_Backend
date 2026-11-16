const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const {authmiddlware} = require('./middleware')
// we will have 4 endpoints here 
//now the last 2 shoull be guided by the middleware 

app.use(express.json());


const USERS = [];
let TODOS = [];

let USER_ID = 1;
let TODOS_ID = 1;

app.post("/signup", function(req,res){
const username = req.body.username;
const password = req.body.password;
const userexist = USERS.find(u=>u.username===username);
if(userexist){
    res.status(403).json({
        msg: "This user already exist",
    })
    return;
}
    USERS.push({
        username,
        password,
        id:USER_ID++
    })

res.json({
    msg : "The signup is succesfull",
})
})

app.post("/signin", function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  const userexist = USERS.find(u=>u.username===username && u.password===password);
  if(!userexist){
     res.status(403).json({
        msg: "This user already exist",
    })
    return;

  }
  const token = jwt.sign({
    userId  : userexist.id,
  },"REDACTED")

  res.json({
    token,
})

})


app.post("/todos", authmiddlware, function(req,res){
const userId = req.userId;
const title = req.body.title;
const description = req.body.description;
TODOS.push({
    title : req.body.title,
    description : req.body.description,
    id : TODOS_ID++,
    userId

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