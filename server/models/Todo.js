const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
});


const Todo = mongoose.model("todos", todoSchema);

module.exports = Todo;
