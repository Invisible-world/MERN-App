const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
connectDB();
const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1/users", require("./routes/usersRoutes"));
app.use("/api/v1/userTodos", require("./routes/userTodosRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
// MONGO_URI=mongodb+srv://root:root@cluster0.hnvax.mongodb.net/MernApp?retryWrites=true&w=majority
