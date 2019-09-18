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
  con.query(INSERT_FISH_CATCH, err => {
    if (err) throw err;
    else {
      res.send("successfully added fish catch!");
    }
  });
});

app.get("/posts/remove", (req, res) => {
  const { pk_fish } = req.query;
  const REMOVE_FISH_CATCH = `DELETE FROM catches WHERE pk_fish = ('${pk_fish}')`;
  con.query(REMOVE_FISH_CATCH, err => {
    if (err) throw err;
    else {
      res.send("successfully removed fish catch!");
    }
  });
});

app.get("/posts/edit", (req, res) => {
  const { pk_fish } = req.query;
  const REMOVE_FISH_CATCH = `UPDATE catches SET fish_name = '${fish_name}', catch_date = '${catch_date}', fish_weight = '${fish_weight} WHERE pk_fish = ('${pk_fish}')`;
  con.query(REMOVE_FISH_CATCH, err => {
    if (err) throw err;
    else {
      res.send("successfully edited fish catch!");
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
