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

app.get("/", (req, res) => {
  res.send("go to /posts to see data");
});

app.get("/posts/add", (req, res) => {
  const { fish_name, catch_date, fish_weight } = req.query;
  const INSERT_FISH_CATCH = `INSERT INTO catches(fish_name,catch_date,fish_weight) VALUES('${fish_name}','${catch_date}','${fish_weight}')`;
  con.query(INSERT_FISH_CATCH, (err, results) => {
    if (err) throw err;
    else {
      res.send("successfully added fish catch!");
    }
  });
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
