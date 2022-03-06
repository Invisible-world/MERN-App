const mongoose = require("mongoose");
const User = require("../model/userModel");

const Schema = mongoose.Schema;

const userTodosSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    completed: {
      type: Boolean,
      // unique: false,
      required: [true, "Please add an status"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UsersTodo", userTodosSchema);
