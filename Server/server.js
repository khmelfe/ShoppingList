const express = require('express')
const app = express()

app.get("/api",(req,res)=> {
    res.json({"users": ["Userone","Usertwo","Userthree"]})
    
})


//server runs on 4000 port . (the reason for 4000 is because on mac 5000 is already taken)

app.listen(4000, ()=>{console.log("Server Started on port 5000")})