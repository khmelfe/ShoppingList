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

async function setUser(user_id, user_name, user_email, user_password) {
  if (!db) throw new Error("DB not initialized. Call initDb first.");
  const users = db.collection("Users");

  const newUser = {
    _id: toInt(user_id),
    name: user_name,
    email: user_email,
    password: user_password,
  };
  console.log("YES!")
  const result = await users.insertOne(newUser);
  return result.insertedId;
}

module.exports = { initDb, setUser };