const { MongoClient } = require("mongodb");

let client ; 
let db;

async function initDb(uri) {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db("ShoppingList");
  return db;
}

function toInt(x) {
  const n = parseInt(x, 10);
  return isNaN(n) ? x : n;
}


function get_id(){
  return result  = users.countDocuments()
  
}

async function setUser( user_name, user_email, user_password,location) {
  if (!db) throw new Error("DB not initialized. Call initDb first.");
  users_db = db.collection("Users");
  const count = await users_db.countDocuments({});
  const id = count + 1;   // simple auto-increment

  console.log("well ",id)
  const newUser = {
    _id: id,
    name: user_name,
    email: user_email,
    password: user_password,
    location : location
  };
  console.log("YES!")
  const result = await users_db.insertOne(newUser);
  return result.insertedId;
}

function checkusecheckuser_username(user_name,user_password) {
    if(!db) throw new Error("DB not initialized.Call initDb first");
    user_db = db.collection("Users");
    user = user_db.findOne({"name":user_name,"password":user_password});
    if (user != null)
      return user
    else
       throw new Error("User Not Found\n") 


}

function checkuser_email(email,user_password) {
    if(!db) throw new Error("DB not initialized.Call initDb first");
    user_db = db.collection("Users");
    user = user_db.findOne({"email":email,"password":user_password});
    if (user != null)
      return user
    else
       throw new Error("User Not Found\n") 


}

module.exports = { initDb, setUser,checkuser_email,checkusecheckuser_username };