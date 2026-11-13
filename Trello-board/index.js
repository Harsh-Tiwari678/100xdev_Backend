const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const {Authmiddleware} = require('./middleware');

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
   const userExist =  USERS.find(u=>u.username===username && u.password===password);
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

app.post('/organizations', Authmiddleware,function(req,res){
const userId = req.userId;
ORGANIZATIONS.push({
    id: ORGANIZATIONS_ID++,
    title: req.body.title,
    description : req.body.description,
    admin : userId,
    members : [],
})

res.json({
    msg  : "Organization created Succesfully",
    id : ORGANIZATIONS_ID-1
})
})

// add-member to the org 

app.post('/add-member-to-the-organization',Authmiddleware,function(req,res){
const userId = req.userId;
const organization_id = req.body.organization_id;
const memberusername = req.body.memberusername;
const orgExist  = ORGANIZATIONS.find(org=>org.id==organization_id);
if(!orgExist||orgExist.admin!=userId){
    res.status(403).json({
        msg: "Either the org does not exist or the requester is not the admin"
    })
    return;
}

const memberExist  = USERS.find(u=>u.username==memberusername);
if(!memberExist){
    res.status(403).json({
        msg: "The user u try to add does not exist ! "
    })
    return;
}
orgExist.members.push(
    memberExist.id,
)
res.json({
    msg : 'Member added Succesfully !'
})
})

//create boards---

app.post('/board',Authmiddleware,function(req,res){
const userId = req.userId;
const organization_id = req.body.organization_id;
const organisation = ORGANIZATIONS.find(org=>org.id === organization_id);
if(!organisation || organisation.admin!=userId){
    res.status(403).json({
   msg: "Either this org does not exist or the admin is not correct !"
    })
    return;
}
BOARDS.push({
    id : BOARDS_ID++,
    title : req.body.title,
    organization_id: req.body.organization_id,
})
res.json({
    msg : "The board is created succesfully ! ",
    id : BOARDS_ID-1,
})
})

// now create an issue --

app.post('/issue', function(req, res){

})

// GET Endpoints --------------------------------

app.get('/organisations',Authmiddleware,function(req,res){
const userId =  req.userId;
const organization_id = parseInt(req.query.organization_id);
const organisation = ORGANIZATIONS.find(org=>org.id === organization_id);
if(!organisation || organisation.admin!=userId){
    res.status(403).json({
   msg: "Either this org does not exist or the admin is not correct !"
    })
    return;
}
res.json({
    organisation: {
      ... organisation,
      members: organisation.members.map(memberId=>{
     const user = USERS.find(user=>user.id===memberId);
     return{
        id : memberId,
        username : user.username,
     }
      }
       
      )
    }
})
})
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

app.delete('/members', Authmiddleware, function(req,res){
const userId = req.userId;
const organization_id = req.body.organization_id;
const memberusername = req.body.memberusername;
const orgExist  = ORGANIZATIONS.find(org=>org.id==organization_id);
if(!orgExist||orgExist.admin!=userId){
    res.status(403).json({
        msg: "Either the org does not exist or the requester is not the admin"
    })
    return;
}

const memberExist  = USERS.find(u=>u.username==memberusername);
if(!memberExist){
    res.status(403).json({
        msg: "The user u try to add does not exist ! "
    })
    return;
}
orgExist.members = orgExist.members.filter(user=> user != memberExist.id);
    
res.json({
    msg : 'Member removed Succesfully !'
})

})

app.listen(3000);