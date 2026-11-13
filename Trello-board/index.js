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
if(!organisation||organisation.admin!=userId){
    res.status(403).json({
        msg: "Either the org does not exist or the requester is not the admin"
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

app.post('/issue', Authmiddleware, function(req, res){
const userId = req.userId;
const board_id = req.body.board_id;
const board =  BOARDS.find(b=>b.id===board_id);
if(!board){
    res.status(403).json({
   msg: "this board does not exist !"
    })
    return;
}
 const organisation = ORGANIZATIONS.find(
        org => org.id === board.organization_id
    );

    // Step 5: Check whether requester is the organization admin
    if (!organisation || organisation.admin !== userId) {
        return res.status(403).json({
            msg: "You are not authorized to create an issue!"
        });
    }
ISSUES.push({
    title : req.body.title,
    board_id : req.body.board_id,
    id : ISSUES_ID++,
    status : 'new'

})
res.json({
    msg : "The issue is created succesfully ! ",
    id : ISSUES_ID-1
})
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
app.get('/boards',Authmiddleware,function(req,res){
const userId = req.userId;
const organization_id = parseInt(req.query.organization_id);
const organisation = ORGANIZATIONS.find(org=>org.id ===organization_id); 
if(!organisation||organisation.admin!=userId){
     res.status(403).json({
   msg: "Either this org does not exist or the admin is not correct !"
    })
    return;
    
}
const myboard = BOARDS.filter(board=>board.organization_id=== organization_id) // borad whose organization id matches my organization id 
res.json({
    myboard,
    No_of_boards : myboard.length
})
})

// when go the the issue boards can see all the issues ---
app.get('/issues', Authmiddleware, function(req,res){
const userId = req.userId;
const board_id = parseInt(req.query.board_id);
const board = BOARDS.find(board=>board.id===board_id);  // jo board id hai vo real mein boards hai ya nhi db mein 
if(!board){
    res.status(404).json({
        msg: "The board does not exist"
    })
    return;
}
//Find the organization to which this board belongs

const organisation = ORGANIZATIONS.find(org=>org.id ===board.organization_id)
if(!organisation|| organisation.admin!=userId){
    res.status(403).json({
        msg:"The user is not allower to see the board"
    })
    return;
}
const myissue = ISSUES.filter(issue=>issue.board_id===board_id) // jo hame request mein board id mili hai kya ye or vo equla hai
res.json({
    myissue,
    totalissue : myissue.length
})

})

// can see how many members i have in the org ---- (doubt)
app.get('/members', Authmiddleware, function(req,res){
const userId = req.userId;
const organization_id = parseInt(req.query.organization_id);
const organisation = ORGANIZATIONS.find(org=>org.id ===organization_id)
if(!organisation|| organisation.admin!=userId){
    res.status(403).json({
        msg:"The user is not allower to see the members"
    })
    return;

}
const mymember = organisation.members.map(memberId=>{
    const user = USERS.find(u=>u.id===memberId)

    return{
        id : user.id,
        username : user.username
    }

})

res.json({
    totoal_members : mymember.length,
    mymember,
})
})

// PUT endpoint --------------------------------

//when moving the issue form one point or section to another ---

app.put('/issues', Authmiddleware,function(req,res){
const userId = req.userId;
//Which issue does the user want to update? Get issue_id from the request body.

const issue_id = parseInt(req.body.issue_id);

//does that issue exist--
const issue = ISSUES.find(issue=>issue.id===issue_id);

// if issue does not exist 
if (!issue) {
    return res.status(404).json({
        msg: "Issue does not exist"
    });
}

//Which board does that issue belong to? Use issue.board_id.

const board = BOARDS.find(board=>board.id===issue.board_id) // BOARD aaray mein issue id match konse issue ki kari 

// if board exist or not --
if(!board){
    return res.status(404).json({
        msg: "Issue does not exist"
    });
}

// Now you have the board object, including its organization_id.

// Then you can find the organization:
const organisation = ORGANIZATIONS.find(org=>org.id===board.organization_id);

// is the logged in user the organization admin ---
if(!organisation||organisation.admin!==userId){
    res.status(403).json({
        msg : "You are not the admin "
    })
    return;
}
// extract the status ----
const status = req.body.status;
// we are having 3 status like new , inprogresss , done .. but the user can send complete etc , so we dont want the value of the status to get inside our db , so we create an array of allowed status 
const allowedstatus = ['new', 'inprogress','done'];
// now we are going to use the include ---

if(!allowedstatus.includes(status)){
    res.status(403).json({
        msg: "This status is invalid"
    })
    return;
}
issue.status  = status;

res.json({
    msg: "The status is updated Succesfully !",
    issue
})
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