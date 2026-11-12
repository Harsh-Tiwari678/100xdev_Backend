const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

//making the in memory database (array's)

const USERS = [];
const ORGANIZATIONS = [];
const BOARDS = [];
const ISSUES = [];


// Giving the specific id with everyhting --

let USERS_ID = 1;
let ORGANIZATIONS_ID = 1;
let BOARDS_ID = 1;
let ISSUES_ID = 1;

app.use(express.json());

// CREATE end points ----------------------------------------------------

// Sing up ---
app.post('/signup', function(req,res){
const username = req.body.username;
const password = req.body.password;
const userExist = USERS.find(u=>u.username==username);
if(userExist){
    res.status(403).json({
        msg: "This user already exist",
    })
    return;
}
USERS.push({
    username,
    password,
    id : USERS_ID++
})
res.json({
    msg: 'The signup is succesfull !'
})
})

// sign in ---

app.post('/signin', function(req,res){
    const username = req.body.username;
    const password = req.body.password;
   const userExist =  USERS.find = (u=>u.username==username && u.u.password==password);
   if(!userExist){
    res.status(403).json({
        msg:"The Credentials are incorrect"
    })
    return;
   }

   // created the token for the user 
const token = jwt.sign({
    userId : userExist.id
},'harsh1234')

res.json({
    token
})

})

// creating organizations ----

app.post('/organizations', function(req,res){

})

// add-member to the org 

app.post('/add-member-to-the-organization',function(req,res){

})

//create boards---

app.post('/board',function(req,res){

})

// now create an issue --

app.post('/issue', function(req, res){

})

// GET Endpoints --------------------------------


// when go to the board , can see what boards i have 
app.get('/boards',function(req,res){

})

// when go the the issue boards can see all the issues ---
app.get('/issues', function(req,res){

})

// can see how many members i have in the org ---- (doubt)
app.get('/members', function(req,res){

})

// PUT endpoint --------------------------------

//when moving the issue form one point or section to another ---

app.put('/issues',function(req,res){

})

// DELETE endpoint --------------------------------

app.delete('/members', function(req,res){

})

app.listen(3000);