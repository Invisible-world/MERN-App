const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const db = require("./model/index");

const Role = db.role;

connectDB();

const app = express();
// var corsOptions = {
//   origin: "http://localhost:3001",
//   optionsSuccessStatus: 200, // For legacy browser support
// };
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1/users", require("./routes/usersRoutes"));
app.use("/api/v1/userTodos", require("./routes/userTodosRoutes"));

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
// console.log(initial());
// console.log(Role.name);
app.listen(port, () => console.log(`Server started on port ${port}`));
// MONGO_URI=mongodb+srv://root:root@cluster0.hnvax.mongodb.net/MernApp?retryWrites=true&w=majority
