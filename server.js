const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.urlencoded());
app.use(express.static("."));
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "DELETE", "UPDATE"],
  })
);
app.get("/displayTasks", (req, res) => {
  let data = fs.readFileSync("./tasks.json", "UTF-8");
  data = JSON.parse(data);
  res.setHeader("Content-Type", "application/json");
  res.send(data);
});

app.post("/addTask", (req, res) => {
  let data = fs.readFileSync("./tasks.json", "UTF-8");
  data = JSON.parse(data);
  const obj = {};
  obj.txt = req.body.txt;
  obj.id = req.body.id;
  data.push(obj);
  fs.writeFileSync("./tasks.json", JSON.stringify(data));
});

app.post("/updateTask", (req, res) => {
  let data = fs.readFileSync("./tasks.json", "UTF-8");
  data = JSON.parse(data);
  console.log(req.body);
  data = data.map((item) => {
    if (item.id === req.body.id) {
      item.txt = req.body.txt;
    }
    return item;
  });
  fs.writeFileSync("./tasks.json", JSON.stringify(data));
});

app.post("/deleteTask", (req, res) => {
  let data = fs.readFileSync("./tasks.json", "UTF-8");
  data = JSON.parse(data);
  data = data.filter((item) => {
    if (item.id != req.body.id) return true;
  });
  fs.writeFileSync("./tasks.json", JSON.stringify(data));
});
app.listen(6090);
