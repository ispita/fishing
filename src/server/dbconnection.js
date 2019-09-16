const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(cors());
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ezpassword",
  database: "fishing"
});

con.connect(err => {
  if (err) throw err;
});

app.get("/posts", function(req, res) {
  console.log("Connected Successfully!!");
  let sql = "SELECT * FROM catches";
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.json({
      data: result
    });
  });
});

app.listen(3001, () => {
  console.log("go to 3001/posts for posts");
});
