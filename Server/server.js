


const express = require('express')
const app = express()

//This const is for reading http request body(json data from POST for example) and make it so can use it here.
const bodyParser = require("body-parser");

const { initDb, setUser } = require("./dbcommands");

(async () => {
  try {
    await initDb("mongodb+srv://admin:admin@cluster0-shoppinglist.fpkt5ya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-ShoppingList");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
})();


app.get("/api",(req,res)=> {
    res.json({"users": ["Userone","Usertwo","Userthree"]})
    
})
// app.post("/new_user", async (req, res) => {
//   try {
//     const { id, name, email, password, type } = req.body;

//     if (!id || !name || !email) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const insertedId = await setUser(1, "Alice", "alice@example.com", "secret");
//     res.status(201).json({ message: "User created", id: insertedId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to create user" });
//   }
// });

app.post("/new", async (req, res) => {
  try {
    // fake values — change them however you like
    const fakeId = Date.now(); // unique id each request
    const fakeName = "Alice_" + Math.floor(Math.random() * 1000);
    const fakeEmail = `alice${Math.floor(Math.random() * 1000)}@example.com`;
    const fakePassword = "secret";
    const fakeType = "test";

    // call your DB helper
    const insertedId = await setUser(fakeId, fakeName, fakeEmail, fakePassword, fakeType);

    res.status(201).json({ message: "Fake user created", id: insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

//server runs on 4000 port . (the reason for 4000 is because on mac 5000 is already taken)

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server Started on port ${PORT}`));

