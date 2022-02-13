// @desc Post users data
// @route POST api/v1/users/register

const registerUser = (req, res) => {
  res.send("Hi,from userController -registerUser");
};

// @desc login  user
// @route POST api/v1/users/login
const loginUser = (req, res) => {
  res.send("Hi,from userController login ");
};

module.exports = { registerUser, loginUser };
