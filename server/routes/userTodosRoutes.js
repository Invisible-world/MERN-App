const express = require("express");
const router = express.Router();

const {
  createUserTodo,
  getUserTodo,
  updateUserTodo,
  deleteUserTodo,
} = require("../controllers/userTodosController");
const { protect } = require("../middleware/authMiddleware");

// const { protect } = require("../middleware/authMiddleware");

// router.post("/create", protect, createUserTodo);
// router.get("/create", protect, getUserTodo);

router.route("/create").post(protect, createUserTodo).get(protect, getUserTodo);
router.put("/update/:_id", protect, updateUserTodo);
router.delete("/delete/:_id", protect, deleteUserTodo);

module.exports = router;
