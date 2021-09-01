const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Todo = require("../../models/Todo");
const User = require("../../models/User");

//@route     POST api/todoList
//@desc     create a todo
//@access    private
router.post(
  "/",
  [auth, check("text", "text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newTodo = new Todo({
        text: req.body.text,
        // name: user.name,
        // avatar: user.avatar,
        user: req.user.id
      });

      const todo = await newTodo.save();
      res.json(todo);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route     GET api/todoList
//@desc      get all todos
//@access    public
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find().sort({ data: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route     GET api/todo/:id
//@desc      get  todo by id
//@access    public
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(400).json({ msg: "todo not found" });
    }
    res.json(todo);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "todo not found" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
