const express = require("express");
const router = express.Router();
const fetchToken = require("../middlewares/fetchToken");
const Todo = require("../models/Todo");
const { body, validationResult } = require("express-validator");

router.post(
  "/createTodo",
  fetchToken,
  [
    body("title", "Title must have atleast 3 characters").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }
      const { title } = req.body;
      const todo = new Todo({
        user: req.user.id,
        title,
      });
      const savedTodo = await todo.save();
      success = true;
      res.json({ success, savedTodo });
    } catch (error) {
      success = false;
      res.status(500).json({ success, error: "Internal server error..." });
    }
  }
);

router.delete("/deleteTodo/:id", fetchToken, async (req, res) => {
  try {
    let success = false;
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(400).json({ success, error: "Not found..." });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ success, error: "Not allowed..." });
    }

    todo = await Todo.findByIdAndDelete(req.params.id);
    success = true;
    res.json({ success, message: "Todo has been deleted successfully..." });
  } catch (error) {
    success = false;
    res.status(500).json({ success, message: "Internal server error..." });
  }
});

router.put("/updateTodo/:id", fetchToken, async (req, res) => {
  try {
    let success = false;
    const { title } = req.body;
    const newTodo = {};
    if (title) {
      newTodo.title = title;
    }

    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(400).json({ success, error: "Not found..." });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ success, error: "Not allowed" });
    }
    todo = await Todo.findByIdAndUpdate(req.params.id,
      { $set: newTodo },
      { new: true })
    success = true;
    res.json({ success, message: "Todo updated successfully" });
  } catch (error) {
    success = false;
    res.status(500).json({ success, error: "Internal server error..." });
  }
});

router.get('/fetchAllTodos',fetchToken, async(req, res)=>{
  try {
     let success = true;
      const todoItems = await Todo.find({user: req.user.id})
      res.json({success, todoItems });
  } catch (error) {
      success = false;
      res.status(500).json({success, error:"Internal server error..."});
  }
})

module.exports = router;
