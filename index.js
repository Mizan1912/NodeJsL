// const http = require("http");

const express = require("express")
const users = require("./node_test.json")

const fs = require('fs')
const app = express();
app.use(express.json())
const PORT=8000;
//Middleware
app.use(express.urlencoded({extended: false}))
app.get("/api/users",(req,res)=>{
     return res.json(users.map((data,i)=>data))
})
app.get("/users",(req,res)=>{
     const html = 
     `
     <ul>
          ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
     </ul>
     `;
     res.send(html)
})

app.get("/api/users/:id",(req,res)=>{
     const id= Number(req.params.id);
     const user= users.find((data)=>data.id==id)
     return res.json(user)
})

app.post("/api/users",(req,res)=>{
     const body=req.body;
     console.log(body);
     users.push({...body,id:users.length+1})
     fs.writeFile('./node_test.json',JSON.stringify(users),(error,data)=>{
          return res.json({status:"success",id:users.length})
     })
     
     
})

app.patch("/api/users/:id",(req,res)=>{
     console.log(req.params.id);
     
     const id = Number(req.params.id);
     const user = users.find((data)=>data.id==id);

     if(!user){
          return res.status(404).json({
               message: "User not found"
          })
     }
     const body = req.body;
     Object.assign(user,req.body)

     fs.writeFile('./node_test.json',JSON.stringify(users),(error,data)=>{
          return res.json({status:"success",user})
     })
     
})

app.delete("/api/users/:id",(req,res)=>{
     const id = Number(req.params.id);
     const user=users.find((data)=>data.id==id)
     const usersad = users.filter((data,i)=>{
          return data.id!==id;
     });

     if(!user){
          return res.status(404).json({
               message: "User not found"
          })
     }

     fs.writeFile('./node_test.json',JSON.stringify(usersad),(error,data)=>{
          return res.status(200).json({
               status:"success",
               message:`User with id: ${req.params.id} deleted successfully`
          })
     })

})


app.listen(PORT,()=>{
     console.log(`Server started at ${PORT}`);
     
})
  
// const myServer = http.createServer(app);

// myServer.listen(8000,()=>console.log("server started"));