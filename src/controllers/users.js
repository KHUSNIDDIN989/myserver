const { readFile, writeFile } = require("../utils/fs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const signup = (req, res) => {
  const data = readFile("users");
  const { user_name, email, password } = req.body;

  if (!user_name && !password) {
    return res.status(401).json({ message: "Invalid username or password " });
  } else if (!email) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const user = {
    user_id: v4(),
    user_name,
    email,
    password,
  };

  writeFile("users", [...data, user]);

  res.json({
    statusbar: "success",
    status: 200,
    token: jwt.sign(user.user_id, "12345"),
  });
};

const signin = (req, res) => {
  const data = readFile("users");
  const { user_name, password } = req.body;
  console.log(user_name, password);
  if (!user_name && !user_name) {
    return res.json({ status: "401", message: "user_name or password is not set correctly or invalid" });
  }

  const foundData = data.find((user) => user.user_name === user_name && user.password === password);
  if (!data) {
    return res.json("User not found");
  }
  delete foundData.password;
  res.json({
    statusbar: "success",
    status: 200,
    token: jwt.sign(foundData?.user_id, "12345"),
    data: foundData,
  });
};

const getUser = (req, res) => {
  const data = readFile("users");

  res.json(data);
};



module.exports = {
  signup,
  getUser,
  signin,
};
