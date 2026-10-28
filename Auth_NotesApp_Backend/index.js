const express = require ('express');
const app = express();
const jwt = require('jsonwebtoken');

//in this we have 2 end points 

// 1. POST - to write a note 
// 2. GET - to get all my notes


app.use(express.json());// We are going to store the notes of the user in an inmemory variable for now 

const notes = []; //this is bad , after that in future we will learn databases where we store our data 

const users = []  //storing the users  username and passs as in menory for now 

//sign_up------

app.post("/signup" , function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const userexist = users.find(user=>user.username == username);
    if(userexist){
     return res.status(403).json({
        message: "User with this same name already exist !!"
     })
    }
    user.push({
        username : username,  // if key and value are same so we can write username , password also
        password : password
    })

    res.json({
        message : "You have signed up ! "
    })

})

//sing in --

app.post("/signin", function(req,rea){
    const username = req.body.username;
    const password =  req.body.password;
    const userexist = users.find(user=>user.username == username && user.password == password)
    if(!userexist){
        res.status(403).json({
            message : "The sign in credentials are wrong"
        })
        return; //early return 
    }

    //jwt sign in process
    const token = jwt.sign({
    username: username,
    password : password,
}, 'harsh123');

res.json({
    token : token,
})
})



//POST endpoint -----

app.post("/notes",function(req,res){
    const note = req.body.note;req
    notes.push(note); //maintaning user ne kon konse notes bnaye hai 
    //in production -- mongodb.store(notes);

    res.json({
        msg: "The note is created !!",
    })
})


//GET Endpoint ---

app.get("/notes",(req,res)=>{
    res.json({
        notes,
    })
})

//Serving Frontend ---
app.get("/",(req,res)=>{
    res.sendFile("/home/harshtiwari/Devlopment/100xdev_Backend/Auth_NotesApp_Backend/Frontend/index.html")
})

app.listen(3008);