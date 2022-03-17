const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const UserTodo = require("../model/userTodos");
const User = require("../model/userModel");

// @desc    Register new user Todo
// @route   POST /api/v1/userTodos/create
// @access  Public
const createUserTodo = async (req, res) => {
  const { title, completed, description } = req.body;
  // console.log(req.body);
  // console.log(req.user);
  if (!title || completed === undefined || completed === null || !description) {
    res.status(400).send("Please add all fields");
    throw new Error("Please add all fields");
  }

  const userTodo = await UserTodo.create({
    userId: req.user && req.user._id,
    title,
    completed,
    description,
  });

  if (userTodo) {
    res.status(201).json({
      title,
      completed,
      userId: req.user && req.user._id,
      description,
    });
  } else {
    res.status(400).send("Invalid user Todo data");
    throw new Error("Invalid user Todo data");
  }
};

// @desc    Get  user Todo
// @route   Get /api/v1/userTodos/create
// @access  Public

const getUserTodo = async (req, res) => {
  let userTodo;
  {
    req.user && req.user._id
      ? (userTodo = await UserTodo.find({ userId: req.user._id }))
      : res.json({ err: "req.user not found " });
  }

  res.json({ userTodo });
};

// @desc    Put/update  user Todo
// @route   Post /api/v1/userTodos/update/:id

// @access  Public
const updateUserTodo = async (req, res) => {
  const { title, completed, description } = req.body;
  if (
    typeof title !== "string" ||
    typeof completed !== "boolean" ||
    typeof description !== "string"
  ) {
    res.status(400).send("please add all field ");
  }
  const todoToBeUpdated = await UserTodo.find({ _id: req.params._id });
  console.log(todoToBeUpdated);

  if (!todoToBeUpdated) {
    res.status(400).send("Todo not found ");
  }

  if (!req.user) {
    res.status(400).send("User not found ");
  }

  console.log(todoToBeUpdated[0].userId.toString());
  // console.log();
  if (todoToBeUpdated[0].userId.toString() !== req.user._id.toString()) {
    res.status(400).send("Donot have authorization to update  ");
  }
  const updateTodo = await UserTodo.findByIdAndUpdate(
    req.params._id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({ updateTodo });
};

//@desc   Delete  user Todo
//@route   Get /api/v1/userTodos/delete/:_id
//@access  Public
const deleteUserTodo = async (req, res) => {
  const todoToBeDeleted = await UserTodo.find({ _id: req.params._id });

  if (!todoToBeDeleted) {
    res.status(400).send("Todo not found ");
  }

  if (!req.user) {
    res.status(400).send("User not found ");
  }

  // console.log(todoToBeUpdated[0].userId.toString());
  // console.log();
  if (todoToBeDeleted[0].userId.toString() !== req.user._id.toString()) {
    res.status(400).send("Donot have authorization to delete  ");
  }
  const deleteTodo = await UserTodo.findByIdAndDelete({ _id: req.params._id });

  res.status(200).json({ deleteTodo });
};

module.exports = {
  createUserTodo,
  getUserTodo,
  updateUserTodo,
  deleteUserTodo,
};
