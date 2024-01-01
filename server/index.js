const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/todo", require("./routes/todo"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port);
