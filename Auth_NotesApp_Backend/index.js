const express = require ('express');
const app = express();

//in this we have 2 end points 

// 1. POST - to write a note 
// 2. GET - to get all my notes



// We are going to store the notes of the user in an inmemory variable for now 

const notes = []; //this is bad , after that in future we will learn databases where we store our data 


//POST endpoint -----

app.post("/notes",function(req,res){
    const note = req.body.note;
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

app.listen(3000);