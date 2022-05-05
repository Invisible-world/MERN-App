const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a role name"],
  },
});

module.exports = mongoose.model("Role", roleSchema);
