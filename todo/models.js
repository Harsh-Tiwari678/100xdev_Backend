const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


// define the scheme for the users and todos collection --

const Users = new Schema({
    username : String ,
    password : String 
})

const Todos = new Schema({
    title : String,
    description : String,
    userId : ObjectId,
    done : Boolean
  
})

const Usermodel = mongoose.model('users', Users)
const Todomodel = mongoose.model('todos', Todos)


module.exports = {
Usermodel,
Todomodel
}