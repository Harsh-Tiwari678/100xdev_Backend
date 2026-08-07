// //file import and export ----
// const fs = require("fs"); //to play with file --
// const {Command} = require("commander");
// const program  = new Command();
// //when user run the -h(help) commmand these are the details which will display 
// program
// .name("File based TODO CLI")
// .description("Let you add , delted , list tasks and also mark them done when completed ")
// .version('1.1.0')

// //now we have to create some helper function to read data from the file and to save data from the file -----


// //helper function 1 -> we fetch the data from the file and then convert it into array  --->

// function read_todos(){
// //first we check that is a file todos.json exist or not 
// // 1. if it not existst then we return an emptty array 
// if(!fs.existsSync('todos.json')){
//   return [];
// }

// //2. if it exists then we read the file content in the utf8 format 
// const data = fs.readFileSync("todos.json","utf-8")

// //Json .parse will convert the text into js object/arrays 
// return  JSON.parse(data || '[]')  //here it is a safety check that if the file is empty then it will parse that string ("[]") and return an array 
// }

// //helper function 2 ->

// function save_todos(todos){
//   //java script aarays into string format here 
//   const textdata = JSON.stringify(todos,null,2);
//   //now it is into the string format now we can write it in the file --
// fs.writeFileSync('todos.json',textdata);
// }


// //now we can have commands ----
// //1. Add

// program
// .command('add')
// .description("Let you add a todo task")
// .argument('<task>' , 'Give the task you want to add')
// .action((task)=>{
//   //first you will fetch the existing todos form array 
//   const todos = read_todos();

//  // now create a new task to add 
//  const new_todo = {
//   id : Date.now(),
//   task : task,
//   done : false ,
//  }

//  todos.push(new_todo);

//  save_todos(todos);

//  console.log(`The new task ->${task} is added Succesfully`);

// })

// program
// .command('list')
// .description('Let you list all the tasks ')

// .action(()=>{
//   const todos = read_todos();
//   if(todos.length===0){
//     console.log("Nothing to show in the list");
//   }
//   todos.forEach((todo,index)=>{
//   const status = todo.done  ? "[Done]" : "[Pending]"
//   save_todos(todos);
//   console.log(`These are the tasks in the list right now  -> ${index+1} ${todo.task}${status} `)
//   })
// })



// program
// .command('delete')
// .description('Let you delete a task ')
// .argument('<index>' , 'index of  the task you wanna delete ')
// .action((index)=>{
//   //first we read all the todo task form the aaray 
//   const todos = read_todos();
// //now user can give the index in string so we convert it into number and then -1 it bcs the index start from 0 in array but here it wil stat form 1

// const todoindex = Number(index)-1;

// //now check whether the user give us the valid index or not 
// if(isNaN(todoindex)||todoindex<0||todoindex>=todos.length){
//   console.log("Invalid Index number ")
//   return;
// }
// const deletetodo = todos.splice(todoindex,1);

// save_todos(todos);

// console.log(`Succesfully Deleted ->${deletetodo[0].task} from the list `)
// })

// program
// .command("done")
// .description("let you mark your todo task as done ")
// .argument('<index>', 'index of the task you want to mark done')
// .action((index)=>{
//   const todos = read_todos();
//  const todosindex = Number(index)-1;
//  if(isNaN(todosindex) || todosindex<0 || todosindex>=todos.length){
//   console.log("Invalid Index");
//   return;
//  }
// todos[todosindex].done = true;
// save_todos(todos);
// console.log(`Marked done ->${todos[todosindex].task}`)
// })
// program.parse();




//  const mythenable = 
//  { then(resolve,reject){ // A meathod called then 
//    resolve(34)}
//   }; 
//   const value = await mythenable; 
//   console.log(value)

// const path = require('path')
// const result = path.resolve("file.txt")
// console.log(result)
