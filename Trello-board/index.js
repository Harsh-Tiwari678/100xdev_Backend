const express = require('express');
const app = express();

//making the in memory database (array's)

const USERS = [];
const ORGANIZATIONS = [];
const BOARDS = [];
const ISSUES = [];

// CREATE end points ----------------------------------------------------

// Sing up ---
app.post('/signup', function(req,res){

})

// sign in ---

app.post('/signup', function(req,res){
    
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