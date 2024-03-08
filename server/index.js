const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const port = 3001;
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ngworks-todos.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/todo", require("./routes/todo"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port);
