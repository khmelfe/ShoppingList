require("dotenv").config({ path: "finally.env" });
const mongoose = require("mongoose")

//Json web Token
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require('express')
const app = express()
//parsing json files into js object
app.use(express.json());
const uri = process.env.MONGO_URI;
const { initDb, setUser,checkuser_email,checkusecheckuser_username} = require("./dbcommands");


//JWT
const secret =  process.env.jwt_serkey

app.use(cookieParser());   

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

//This const is for reading http request body(json data from POST for example) and make it so can use it here.
const bodyParser = require("body-parser");


//DB commands that are used.

(async () => {
  try {
    await initDb(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
})();

//Checking Auth
function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  jwt.verify(token, secret, (err, payload) => {
    if (err) return res.status(401).json({ error: "Invalid or expired token" });
    req.user = payload; // e.g. { id, email }
    next();
  });
}
app.get("/api",(req,res)=> {
    res.json({"users": ["Userone","Usertwo","Userthree"]})
    
})

app.post("/new_user", async (req, res) => {
  try {
     const formData = req.body.username;   // <--- form is here
     console.log(formData);

     const username =req.body.username;
     const pw = req.body.password;
     const email = req.body.email;
     const loc = req.body.loc;
     
    if (  !username || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const insertedId = await setUser( username, email, pw,loc);
    res.status(201).json({ message: "User created", id: insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});
//login to Web.
app.post("/login", (req,res)=>{
  let checkuser
  try{
    
    const pw = req.body.password;

    //  if (!username || !pw) {
    //   return res.status(400).json({ error: "Missing Username Or Password" });
    // }
    if(req.body.email !=null){
     checkuser =  checkuser_email(req.body.email,pw)
    }
    else {check_user =  checkuser_username(req.body.username,pw)}
    const payload = {
      username: checkuser.username,
      loc:checkuser.loc
    }

    //jwt
    const token = jwt.sign(
      payload,
        secret,
        {expiresIn: process.env.jwt_expires_in,
      },)


       res.cookie("token", token, {
    httpOnly: true,
    secure: false,       // true in production with HTTPS
    sameSite: "lax",     // 'strict' for tighter CSRF, 'none' (+ secure:true) for cross-site
    maxAge: process.env.jwt_expires_in, // 1h in ms, match expiresIn
    path: "/",           // cookie is sent to all routes
  });
     res.status(200).json({ success: true,data: {token:token
                },
            });
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

//Auth,using HTTPONLY COOKIE
app.get("/auth", (req, res) => {
  const header = req.headers.authorization;                  // "Bearer <token>"
  const cookieToken = req.cookies?.token;                    // httpOnly cookie
  const bodyToken = req.body?.token;                         
  const token = cookieToken || (header && header.split(" ")[1]) || bodyToken;
  if (!token) {
        console.log("Token is Dead");
    return res.status(401).json({ login: false, error: "No token" });}
  try {
        

    const decoded = jwt.verify(token, secret);

    res.json({ login: true, data: decoded });
  } catch (e) {
    res.status(401).json({ login: false, error: "Invalid/expired token" });
  }
});

// POST /logout
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,    // true in production with HTTPS
    sameSite: "lax",
    path: "/",        // must match how you set the cookie at login
  });
  res.json({ success: true, message: "Logged out" });
});

//server runs on 4000 port . (the reason for 4000 is because on mac 5000 is already taken)

app.listen(process.env.PORT, () => console.log(`🚀 Server Started on port ${process.env.PORT}`));

