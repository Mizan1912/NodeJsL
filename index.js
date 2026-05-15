// const http = require("http");

const express = require("express")
const users = require("./node_test.json")
const mongoose=require("mongoose")


const {connectMongoDb}=require("./connection")

connectMongoDb("mongodb://127.0.0.1:27017/BEDEV")

const fs = require('fs');
const UserRouter = require("./routes/user");

const app = express();
app.use(express.json())
const PORT=8000;
//Middleware
app.use(express.urlencoded({extended: false}))


app.use("/users",UserRouter);


app.listen(PORT,()=>{
     console.log(`Server started at ${PORT}`);
     
})
  
// const myServer = http.createServer(app);

// myServer.listen(8000,()=>console.log("server started"));