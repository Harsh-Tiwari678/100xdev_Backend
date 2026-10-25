const express = require('express');
const app = express();
app.use(express.json());
app.post('/health-checkup',function(req,res){
    //user will send ->kidney will be an array [1,2,3]
    const kidneys = req.body.kidneys;
    const kidneyslength = kidneys.length;


    res.send("Your kidneys length is " + kidneyslength);
})

// adding a global catch ---

app.use(function(err,req,res,next){
    res.send("something is wrong")
    
})

app.listen(3000);