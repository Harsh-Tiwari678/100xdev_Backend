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
const done   = req.body.done;
 await Todomodel.create({
    title : title ,
    description : description,
    done  : done,
    userId : userId
})

res.json({
    msg : "The todo is added succesfully !"
})

})




app.delete("/todo", authmiddlware, async function(req,res){
const userId = req.userId;
const todoid = req.query.id;
console.log("req.userId:", req.userId);
console.log("todoid:", todoid);

const found = await Todomodel.findById(todoid);
console.log("todo in DB:", found);
const Deleted_todo = await Todomodel.findOneAndDelete({
   _id: todoid,
    userId : userId
})
res.json({
    id : todoid,
    Deleted_todo,
    msg : "This todo is succesfully deleted !"
})
})

app.get("/todos", authmiddlware, async function(req,res){
const userId = req.userId;
const response = await Todomodel.find({
    userId : userId
})

res.json({
    todo : response
})
})
app.listen(3000);